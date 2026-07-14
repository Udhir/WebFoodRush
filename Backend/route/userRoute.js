const express = require("express");

const router = express.Router();

const {
  addUser,
  login,
  getUsers,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
} = require("../controller/userController");

const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/create", addUser);

router.post("/login", login);

router.get("/getAll", verifyToken, isAdmin, getUsers);

router.get("/getById/:id", getUserByIDDB);

router.put("/updateById/:id", updateUserIDBD);

router.delete("/deleteById/:id", deleteUserByIDDB);

module.exports = router;