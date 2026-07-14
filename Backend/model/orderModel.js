const pool = require("../database/db");

// Create Order
const createOrder = async (
    user_id,
    total_price,
    payment_method,
    address
) => {

    const result = await pool.query(
        `INSERT INTO orders
        (user_id,total_price,payment_method,address)
        VALUES($1,$2,$3,$4)
        RETURNING *`,
        [
            user_id,
            total_price,
            payment_method,
            address,
        ]
    );

    return result.rows[0];
};

// Add Order Item
const addOrderItem = async (
  order_id,
  food_id,
  quantity,
  price
) => {
  const result = await pool.query(
    `INSERT INTO order_items
    (order_id,food_id,quantity,price)
    VALUES($1,$2,$3,$4)
    RETURNING *`,
    [order_id, food_id, quantity, price]
  );

  return result.rows[0];
};

// Get All Orders
const getAllOrders = async () => {
  const result = await pool.query(
    `SELECT
      orders.*,
      users.fullname,
      users.email
     FROM orders
     JOIN users
     ON users.id = orders.user_id
     ORDER BY orders.id DESC`
  );

  return result.rows;
};

// Get User Orders
const getMyOrders = async (user_id) => {
  const result = await pool.query(
    `SELECT *
     FROM orders
     WHERE user_id=$1
     ORDER BY id DESC`,
    [user_id]
  );

  return result.rows;
};

// Update Status
const updateStatus = async (
  id,
  status
) => {
  const result = await pool.query(
    `UPDATE orders
     SET status=$1
     WHERE id=$2
     RETURNING *`,
    [status, id]
  );

  return result.rows[0];
};

// Delete Order
const deleteOrderById = async (id) => {
  await pool.query(
    "DELETE FROM orders WHERE id=$1",
    [id]
  );
};

module.exports = {
  createOrder,
  addOrderItem,
  getAllOrders,
  getMyOrders,
  updateStatus,
  deleteOrderById,
};