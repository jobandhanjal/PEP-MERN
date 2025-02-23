import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const SignupPage = () => {
  const [isOtpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(e.target.password.value, e.target.conformpassword.value);

    if (e.target.password.value !== e.target.conformpassword.value) {
      alert('password doesnot match');
      return;
    }

    try {
      const resp = await fetch('http://localhost:2005/users/register', {
        method: 'POST',
        body: JSON.stringify({
          email,
          fullName,
          password: e.target.password.value,
          otp: e.target.otp.value,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      console.log(resp);
      const respObj = await resp.json();
      console.log(respObj);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log(e.target.useremail.value);
    console.log(e.target.fullname.value);
    try {
      const resp = await fetch('http://localhost:2005/otps', {
        method: 'POST',
        body: JSON.stringify({
          email: e.target.useremail.value,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      console.log(resp);
      const respObj = await resp.json();
      console.log(respObj);
      if (respObj.status === 'success') {
        setOtpSent(true);
        setFullName(e.target.fullname.value);
        setEmail(e.target.useremail.value);
      }
    } catch (error) {
      alert('Error ' + error);
      console.log(error.message);
    }
  };

  return (
    <>
      {isOtpSent ? (
        <form onSubmit={handleRegister}>
          <input type="email" value={email} readOnly />
          <input type="text" value={fullName} readOnly />
          <input type="text" placeholder="OTP" name="otp" />
          <input type="password" placeholder="password" name="password" />
          <input
            type="password"
            placeholder="consorm-password"
            name="conformpassword"
          />
          <button>Register</button>
        </form>
      ) : (
        <form onSubmit={handleSendOtp}>
          <input placeholder="fullName" name="fullname" />
          <input placeholder="Email" name="useremail" />
          <button>Send otp</button>
        </form>
      )}

      <Link to="/login">Login</Link>
    </>
  );
};

export default SignupPage;
