const pool = require("../database/db");

const dashboard = async (req, res) => {
  try {

    const users = await pool.query(
      "SELECT COUNT(*) FROM users"
    );

    const foods = await pool.query(
      "SELECT COUNT(*) FROM foods"
    );

    const orders = await pool.query(
      "SELECT COUNT(*) FROM orders"
    );

    const revenue = await pool.query(
      `
      SELECT COALESCE(SUM(total_amount),0) AS total
      FROM orders
      WHERE order_status='Delivered'
      `
    );

    res.json({

      totalUsers: users.rows[0].count,

      totalFoods: foods.rows[0].count,

      totalOrders: orders.rows[0].count,

      totalRevenue: revenue.rows[0].total

    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};

module.exports = {
  dashboard
};