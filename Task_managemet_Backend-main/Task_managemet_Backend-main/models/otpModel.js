const mongoose = require('mongoose');

const OtpScheema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OTP = mongoose.model('otps', OtpScheema);
module.exports = {
  OTP,
};
