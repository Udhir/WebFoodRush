const pool = require("../database/db");

const createUser = async (fullname, email, password, role = "user") => {
  const result = await pool.query(
    `INSERT INTO users(fullname, email, password, role)
     VALUES($1,$2,$3,$4) RETURNING *`,
    [fullname, email, password, role]
  );
  return result.rows[0];
};

const existingUser = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  return result.rows[0];
};

const getAllUser = async () => {
  const result = await pool.query(
    "SELECT * FROM users ORDER BY id"
  );

  return result.rows;
};

const searchUser = async (keyword) => {
  const result = await pool.query(
    `SELECT * FROM users
     WHERE fullname ILIKE $1
     OR email ILIKE $1`,
    [`%${keyword}%`]
  );

  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id=$1",
    [id]
  );

  return result.rows[0];
};

const deleteUserById = async (id) => {
  // Delete cart items
  await pool.query("DELETE FROM cart WHERE user_id=$1", [id]);
  
  // Delete payments
  await pool.query("DELETE FROM payments WHERE user_id=$1", [id]);
  
  // Delete order items for this user's orders
  await pool.query("DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id=$1)", [id]);
  
  // Delete orders
  await pool.query("DELETE FROM orders WHERE user_id=$1", [id]);

  // Finally delete user
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};

const updateById = async (
  id,
  fullname,
  email,
  password
) => {
  const result = await pool.query(
    `UPDATE users
     SET fullname=$1,
         email=$2,
         password=$3
     WHERE id=$4
     RETURNING *`,
    [fullname, email, password, id]
  );

  return result.rows[0];
};

// --- OTP / Password Reset Functions ---
const saveOTP = async (email, otp) => {
  await pool.query("UPDATE users SET reset_otp=$1 WHERE email=$2", [otp, email]);
};

const verifyOTP = async (email, otp) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1 AND reset_otp=$2",
    [email, otp]
  );
  return result.rows[0];
};

const resetPassword = async (email, hashedPassword) => {
  await pool.query(
    "UPDATE users SET password=$1, reset_otp=NULL WHERE email=$2",
    [hashedPassword, email]
  );
};

module.exports = {
  createUser,
  existingUser,
  getAllUser,
  searchUser,
  getUserById,
  deleteUserById,
  updateById,
  saveOTP,
  verifyOTP,
  resetPassword,
};