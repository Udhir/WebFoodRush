const pool = require("../database/db");

// Add Food
const createFood = async (
  foodname,
  description,
  price,
  category,
  image
) => {
  const result = await pool.query(
    `INSERT INTO foods
    (foodname, description, price, category, image)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *`,
    [foodname, description, price, category, image]
  );

  return result.rows[0];
};

// Get All Foods
const getAllFood = async () => {
  const result = await pool.query(
    "SELECT * FROM foods ORDER BY id DESC"
  );

  return result.rows;
};

// Search Food
const searchFood = async (keyword) => {
  const result = await pool.query(
    `SELECT * FROM foods
     WHERE foodname ILIKE $1
     OR category ILIKE $1`,
    [`%${keyword}%`]
  );

  return result.rows;
};

// Get Food By ID
const getFoodById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM foods WHERE id=$1",
    [id]
  );

  return result.rows[0];
};

// Delete Food
const deleteFoodById = async (id) => {
  await pool.query(
    "DELETE FROM foods WHERE id=$1",
    [id]
  );
};

// Update Food
const updateFoodById = async (
  id,
  foodname,
  description,
  price,
  category,
  image
) => {
  const result = await pool.query(
    `UPDATE foods
     SET foodname=$1,
         description=$2,
         price=$3,
         category=$4,
         image=$5
     WHERE id=$6
     RETURNING *`,
    [
      foodname,
      description,
      price,
      category,
      image,
      id,
    ]
  );

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