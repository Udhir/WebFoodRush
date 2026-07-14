const pool = require("../database/db");

// Add To Cart
const addCart = async (user_id, food_id, quantity) => {
  const result = await pool.query(
    `INSERT INTO cart(user_id, food_id, quantity)
     VALUES($1,$2,$3)
     RETURNING *`,
    [user_id, food_id, quantity]
  );

  return result.rows[0];
};

// Get Cart By User
const getCart = async (user_id) => {
  const result = await pool.query(
    `SELECT
        cart.id,
        foods.foodname,
        foods.price,
        foods.image,
        cart.quantity
     FROM cart
     JOIN foods
     ON foods.id = cart.food_id
     WHERE user_id = $1`,
    [user_id]
  );

  return result.rows;
};

// Delete Cart Item
const deleteCart = async (id) => {
  await pool.query(
    "DELETE FROM cart WHERE id=$1",
    [id]
  );
};

// Update Quantity
const updateQuantity = async (id, quantity) => {
  const result = await pool.query(
    `UPDATE cart
     SET quantity=$1
     WHERE id=$2
     RETURNING *`,
    [quantity, id]
  );

  return result.rows[0];
};

module.exports = {
  addCart,
  getCart,
  deleteCart,
  updateQuantity,
};