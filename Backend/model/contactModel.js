const pool = require("../database/db");

const createContact = async (name, email, message) => {
  const result = await pool.query(
    `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *`,
    [name, email, message]
  );
  return result.rows[0];
};

const getAllContacts = async () => {
  const result = await pool.query("SELECT * FROM contacts ORDER BY id ASC");
  return result.rows;
};

const deleteContactById = async (id) => {
  await pool.query("DELETE FROM contacts WHERE id=$1", [id]);
};

module.exports = {
  createContact,
  getAllContacts,
  deleteContactById,
};
