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

// Create User
const addUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Fields cannot be empty",
      });
    }

    const userExist = await existingUser(email);

    if (userExist) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      fullname,
      email,
      hashPassword
    );

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (e) {
    res.status(500).json({
      message: "User Creation Failed",
      error: e.message,
    });
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

    const match = await bcrypt.compare(
      password,
      user.password
    );

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

    const user = await updateById(
      id,
      fullname,
      email,
      hashPassword
    );

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

module.exports = {
  addUser,
  login,
  getUsers,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
};