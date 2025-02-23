require('dotenv').config();
require('./config/dbconfig');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const User = require('./models/usermodel');
const { GenerateOtp } = require('./utils/otpHelpers');
const { sendOtpEmail } = require('./utils/emailHelpers');
const { OTP } = require('./models/otpModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const Task = require('./models/taskModel');
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
});

const PORT = process.env.PORT || 2005;

const app = express();
app.use(morgan('dev'));

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5174',
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log('request required', req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Server is working fine ...</h1>');
});

app.get('/users', async (req, res) => {
  try {
    console.log('sucess');
    const data = await User.find();
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    console.log('error in get', error.message);
    res.status(500).json({
      status: 'failure',
      message: 'Internal server error' + error.message,
    });
  }
});

app.post('/users/register', async (req, res) => {
  try {
    const { email, password, otp, fullName } = req.body;
    console.log(fullName);

    const otpDoc = await OTP.findOne({
      email: email,
    }).sort('-createdAt');
    console.log(otpDoc);

    if (!otpDoc) {
      res.status(400).json({
        status: 'fail',
        message: 'Email already exists',
      });
      return;
    }

    const { otp: hashedotp } = otpDoc;

    const isOtpCorrect = await bcrypt.compare(otp.toString(), hashedotp);

    if (!isOtpCorrect) {
      res.status(401).json({
        status: 'fail',
        message: 'invalid otp',
      });
      return;
    }

    const newSalt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(password, newSalt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    res.status(200).json({
      status: 'success',
      data: {
        email: newUser.email,
        fullname: newUser.fullName,
      },
    });
  } catch (error) {
    console.log('error in post: ', error);
    if (error.name === 'ValidationError') {
      res.status(400).json({
        status: 'failure',
        message: 'Data validation failed ' + error.message,
      });
    } else if (error.code) {
      res.status(400).json({
        status: 'failure',
        message: 'email already exists',
      });
    } else {
      res.status(500).json({
        status: 'failure',
        message: 'internal server error',
      });
    }
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        status: 'fail',
        message: 'Email an password are required',
      });
    }
    const currUser = await User.findOne({ email });
    if (!currUser) {
      res.status(400).json({
        status: 'fail',
        message: 'Email or password Invalid',
      });
      return;
    }

    const { password: hashedPassword, _id, fullName } = currUser;
    const ispasswordCorrect = await bcrypt.compare(password, hashedPassword);
    if (!ispasswordCorrect) {
      res.status(401).json({
        status: 'fail',
        message: 'Invalid email or password',
      });
      return;
    }

    // issue a jwt token that is used for validation in future

    const token = jwt.sign(
      {
        email,
        _id,
        fullName,
      }, // payload
      process.env.JWT_SECRET_KEY, // secret key
      {
        expiresIn: '1d', // extra information
      }
    );

    console.log(token);

    res.cookie('authorization', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none', // front-end and back-end runs on different domain
    });

    res.status(200).json({
      status: 'success',
      message: 'user login',
      data: {
        user: {
          email,
          fullName,
        },
      },
    });
  } catch (error) {
    console.log('Error in user login: ', error.message);
    res.status(5000).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
});

// request handler to send the otp
app.post('/otps', async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    //
    if (!email) {
      res.status(400).json({
        status: 'failure',
        message: 'email is missing in the parameter',
      });
      return;
    }

    // create otp, store it in DB, send the sucess response

    const otp = GenerateOtp();
    const isEmailSent = await sendOtpEmail(email, otp);
    // console.log(isEmailSent);

    if (!isEmailSent) {
      res.status(500).json({
        ststus: 'failure',
        message: 'Email could not send',
      });
      return;
    }

    console.log(otp);

    const newSalt = await bcrypt.genSalt(14); // rounds x (iterations pow(2^x))
    const hashedotp = await bcrypt.hash(otp.toString(), newSalt);

    await OTP.create({
      email,
      otp: hashedotp,
    });

    res.status(201).json({
      status: 'success',
      message: `OTP send to ${email}`,
    });
  } catch {
    console.log(error.message);
  }
});

app.get('/users/logout', (req, res) => {
  try {
    console.log(req.cookies);
    res.clearCookie('authorization');
    res.json({
      status: 'success',
      message: 'logout sucessfully',
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.use(cookieparser());
// middle ware to authrose the user
app.use((req, res, next) => {
  // validate the token
  // --> get the token from cookies

  const { authorization } = req.cookies;
  console.log(authorization);

  if (!authorization) {
    res.status(401).json({
      status: 'fail',
      message: 'Authtication failed',
    });
    return;
  }

  jwt.verify(authorization, process.env.JWT_SECRET_KEY, (error, data) => {
    if (error) {
      // token expires or not authorised
      res.status(401).json({
        status: 'error',
        message: 'Auth failed',
      });
      return;
    } else {
      req.currUser = data;
    }
    next();
  });
});

app.post('/tasks', async (req, res) => {
  try {
    // 1. get the data from request
    const taskInfo = req.body;
    const { email } = req.currUser;

    // 2. validate the data :: now mongoose does that
    // 3. save the data in db :: MongoDB (online --> ATLAS) (offline is pain to setup :: in deployment we will mostly prefer online)
    const newTask = await Task.create({
      ...taskInfo,
      assignor: email,
    });

    res.status(201); //created
    res.json({
      status: 'success',
      data: {
        task: newTask,
      },
    });
  } catch (err) {
    console.log('Error in POST /tasks', err.message);
    if (err.name === 'ValidationError') {
      res.status(400).json({ status: 'fail', message: err.message });
    } else {
      res
        .status(500)
        .json({ status: 'fail', message: 'Internal Server Error' });
    }
  }
});

app.get('/users/me', (req, res) => {
  try {
    const { email, fullName } = req.currUser;
    res.status(200);
    res.json({
      status: 'success',
      data: {
        user: {
          email,
          fullName,
        },
      },
    });
  } catch (err) {
    console.log('error is GET /users/me', err.message);
    res.status(500);
    res.json({
      status: 'fail',
      message: 'INTERNAL SERVER ERROR',
    });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const taskList = await Task.find().or([
      { assignor: req.currUser.email },
      { assignee: req.currUser.email },
    ]);
    res.status(200);
    res.json({
      status: 'success',
      data: {
        tasks: taskList,
      },
    });
  } catch (err) {
    console.log('error is GET /users/me', err.message);
    res.status(500);
    res.json({
      status: 'fail',
      message: 'INTERNAL SERVER ERROR',
    });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
