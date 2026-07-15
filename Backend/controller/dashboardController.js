const pool = require("../database/db");

const dashboard = async (req, res) => {
  try {
    const totalUsers = await pool.query("SELECT COUNT(*) FROM users");
    const totalFoods = await pool.query("SELECT COUNT(*) FROM foods");
    const totalOrders = await pool.query("SELECT COUNT(*) FROM orders");

    const recentOrders = await pool.query(
      `SELECT orders.id, users.fullname AS name, orders.total_price, orders.status
       FROM orders JOIN users ON users.id = orders.user_id
       ORDER BY orders.id DESC LIMIT 5`
    );

    res.status(200).json({
      totalUsers: totalUsers.rows[0].count,
      totalFoods: totalFoods.rows[0].count,
      totalOrders: totalOrders.rows[0].count,
      recentOrders: recentOrders.rows,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { dashboard };