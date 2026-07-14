const pool = require("../database/db");

const createUser = async (fullname, email, password) => {
  const result = await pool.query(
    `INSERT INTO users(fullname,email,password)
     VALUES($1,$2,$3)
     RETURNING *`,
    [fullname, email, password]
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
  await pool.query(
    "DELETE FROM users WHERE id=$1",
    [id]
  );
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

module.exports = {
  createUser,
  existingUser,
  getAllUser,
  searchUser,
  getUserById,
  deleteUserById,
  updateById,
};