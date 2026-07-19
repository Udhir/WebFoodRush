const pool = require("../database/db");

const createFood = async (foodname, description, price, category, image) => {
  const result = await pool.query(
    `INSERT INTO foods(foodname, description, price, category, image)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [foodname, description, price, category, image]
  );
  return result.rows[0];
};

const getAllFood = async () => {
  const result = await pool.query("SELECT * FROM foods ORDER BY id ASC");
  return result.rows;
};

const searchFood = async (keyword) => {
  const result = await pool.query(
    `SELECT * FROM foods WHERE foodname ILIKE $1 OR category ILIKE $1`,
    [`%${keyword}%`]
  );
  return result.rows;
};

const getFoodById = async (id) => {
  const result = await pool.query("SELECT * FROM foods WHERE id=$1", [id]);
  return result.rows[0];
};

const deleteFoodById = async (id) => {
  await pool.query("DELETE FROM foods WHERE id=$1", [id]);
};

const updateFoodById = async (id, foodname, description, price, category, image) => {
  const query = image
    ? `UPDATE foods SET foodname=$1, description=$2, price=$3, category=$4, image=$5
       WHERE id=$6 RETURNING *`
    : `UPDATE foods SET foodname=$1, description=$2, price=$3, category=$4
       WHERE id=$5 RETURNING *`;
  const params = image
    ? [foodname, description, price, category, image, id]
    : [foodname, description, price, category, id];

  const result = await pool.query(query, params);
  return result.rows[0];
};

module.exports = {
  createFood,
  getAllFood,
  searchFood,
  getFoodById,
  deleteFoodById,
  updateFoodById,
};