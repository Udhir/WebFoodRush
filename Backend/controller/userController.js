const {
  createUser,
  existingUser,
  getAllUser,
  getUserById,
  deleteUserById,
  updateById,
  searchUser,
} = require("../model/userModel");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { saveOTP, verifyOTP, resetPassword } = require("../model/userModel");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "foodrushproject@gmail.com", 
    pass: process.env.EMAIL_PASS || "project123", 
  },
});

// Create User
const addUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }

    const userExist = await existingUser(email);
    if (userExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const role = email.toLowerCase().endsWith("@foodrush.com") ? "admin" : "user";

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await createUser(fullname, email, hashPassword, role);

    res.status(201).json({ message: "User Created Successfully", user });
  } catch (e) {
    res.status(500).json({ message: "User Creation Failed", error: e.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fields cannot be empty",
      });
    }

    const user = await existingUser(email);

    if (!user) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        message: "Password Incorrect",
      });
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const { password: userPassword, ...safeUser } = user;

    res.status(200).json({
      message: "Login Successful",
      token,
      user: safeUser,
    });
  } catch (e) {
    res.status(500).json({
      message: "Login Failed",
      error: e.message,
    });
  }
};

// Get All Users / Search Users
const getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let users;

    if (search) {
      users = await searchUser(search);
    } else {
      users = await getAllUser();
    }

    res.status(200).json({
      message: "Users Fetched Successfully",
      users,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      error: e.message,
    });
  }
};

// Get User By ID
const getUserByIDDB = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Fetch Failed",
      error: e.message,
    });
  }
};

// Delete User
const deleteUserByIDDB = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUserById(id);

    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "Delete Failed",
      error: e.message,
    });
  }
};

// Update User
const updateUserIDBD = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Fields cannot be empty",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await updateById(id, fullname, email, hashPassword);

    res.status(200).json({
      message: "User Updated Successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "Update Failed",
      error: e.message,
    });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await existingUser(email);
    if (!user) return res.status(404).json({ message: "Email not found" });

    // Generate 6-digit OTP (Static for university presentation)
    const otp = "123456";
    await saveOTP(email, otp);

    const mailOptions = {
      from: '"FoodRush" <noreply@foodrush.com>',
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is: ${otp}. It is valid for a short time.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.log(`Failed to send email to ${email}`);
    }

    res.status(200).json({ message: "OTP sent to your email" }); 
  } catch (e) {
    res.status(500).json({ message: "Request Failed", error: e.message });
  }
};

// Reset Password
const resetPasswordDB = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await verifyOTP(email, otp);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    await resetPassword(email, hashPassword);

    res.status(200).json({ message: "Password reset successful" });
  } catch (e) {
    res.status(500).json({ message: "Reset Failed", error: e.message });
  }
};

module.exports = {
  addUser,
  login,
  getUsers,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
  forgotPassword,
  resetPasswordDB,
};