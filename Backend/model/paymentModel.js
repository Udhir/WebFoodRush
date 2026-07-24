const pool = require("../database/db");

const createPayment = async (user_id, order_id, amount, method, status, reference) => {
  const result = await pool.query(
    `INSERT INTO payments(user_id, order_id, amount, method, status, reference)
     VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [user_id, order_id, amount, method, status, reference]
  );
  return result.rows[0];
};


const updatePaymentStatus = async (reference, status) => {
  const result = await pool.query(
    "UPDATE payments SET status=$1 WHERE reference=$2 RETURNING *",
    [status, reference]
  );
  return result.rows[0];
};

module.exports = { createPayment, updatePaymentStatus };