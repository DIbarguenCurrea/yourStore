const db = require("../../config/dbConfig");

const createUser = async (userData) => {
  const { name, email, password_hash } = userData;

  const sql = `
  INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?);
  `;
  const [result] = await db.execute(sql, [name, email, password_hash]);
  return result;
};

const userbyId = async (id) => {
  const sql = `SELECT id, name, email, password_hash FROM users WHERE id = ? limit 1`;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

const userByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ? limit 1`;
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

const updateUser = async (id, userData) => {
  const { name, password_hash } = userData;
  const sql = `UPDATE users SET name = ?, password_hash = ? WHERE id = ?`;
  const [result] = await db.execute(sql, [name, password_hash, id]);
  return result;
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

module.exports = { createUser, userbyId, userByEmail, updateUser, deleteUser };
