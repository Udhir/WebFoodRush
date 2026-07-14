const pool = require("../database/db");

const createCategory = async (name, image) => {
  const result = await pool.query(
    `INSERT INTO categories(name,image)
     VALUES($1,$2)
     RETURNING *`,
    [name, image]
  );

  return result.rows[0];
};

const getAllCategory = async () => {
  const result = await pool.query(
    "SELECT * FROM categories ORDER BY id DESC"
  );

  return result.rows;
};

const searchCategory = async (keyword) => {
  const result = await pool.query(
    `SELECT * FROM categories
     WHERE name ILIKE $1`,
    [`%${keyword}%`]
  );

  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM categories WHERE id=$1",
    [id]
  );

  return result.rows[0];
};

const deleteCategoryById = async (id) => {
  await pool.query(
    "DELETE FROM categories WHERE id=$1",
    [id]
  );
};

const updateCategoryById = async (
  id,
  name,
  image
) => {
  const result = await pool.query(
    `UPDATE categories
     SET
     name=$1,
     image=$2
     WHERE id=$3
     RETURNING *`,
    [name, image, id]
  );

  return result.rows[0];
};

module.exports = {
  createCategory,
  getAllCategory,
  searchCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
};