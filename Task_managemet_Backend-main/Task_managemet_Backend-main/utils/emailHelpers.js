require('dotenv').config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// from email is fixed
const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `Task management Tool <${process.env.GMAIL_ACCOUNT}>`,
      to,
      subject,
      html,
    });

    return info;
  } catch (error) {
    console.log('Error occured in sendEmail', error.message);
    return false;
  }
};

const sendOtpEmail = async (email, otp) => {
  const isEmailSent = await sendEmail(
    email,
    'OTP varifacation from task managemant tool',
    `<p>Your otp is <span style="color:brown">${otp}</span></p>`
  );

  return isEmailSent;
};

module.exports = {
  sendOtpEmail,
};
