const bcrypt = require("bcrypt");
const { saveOTP, verifyOTP, resetPassword } = require("../model/userModel");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    await saveOTP(email, otp);

    // Demo only: OTP returned in response instead of emailed.
    res.json({ message: "OTP Generated", otp });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const newPassword = async (req, res) => {
  try {
    const { email, otp, password } = req.body;

    const valid = await verifyOTP(email, otp);
    if (!valid) {
      return res.status(400).json({ message: "Invalid or Expired OTP" });
    }

    const hash = await bcrypt.hash(password, 10);
    await resetPassword(email, hash);

    res.json({ message: "Password Changed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { forgotPassword, newPassword };