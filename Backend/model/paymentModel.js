const pool = require("../database/db");

const createPayment = async (user_id, order_id, amount, method, status, reference) => {
  const result = await pool.query(
    `INSERT INTO payments(user_id, order_id, amount, method, status, reference)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [user_id, order_id, amount, method, status, reference]
  );
  return result.rows[0];
};

const paymentHistory = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM payments WHERE user_id=$1 ORDER BY id ASC",
    [user_id]
  );
  return result.rows;
};

module.exports = { createPayment, paymentHistory };