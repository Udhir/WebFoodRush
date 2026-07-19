const express = require("express");

const router = express.Router();

const {
  addUser,
  login,
  getUsers,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
  forgotPassword,
  verifyOtpController,
  resetPasswordDB,
} = require("../controller/userController");

const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/create", addUser);

router.post("/login", login);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOtpController);

router.post("/reset-password", resetPasswordDB);

router.get("/getAll", verifyToken, isAdmin, getUsers);

router.get("/getById/:id", verifyToken, getUserByIDDB);

router.put("/updateById/:id", verifyToken, isAdmin, updateUserIDBD);

router.delete("/deleteById/:id", verifyToken, isAdmin, deleteUserByIDDB);

module.exports = router;