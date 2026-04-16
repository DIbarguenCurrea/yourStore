const db = require("../../config/dbConfig");

const createUser = async (userData) => {
  const { name, email, password_hash } = userData;

  const sql = `
  INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?);
  `;
  const [result] = await db.execute(sql, [name, email, password_hash]);
  return result;
};

const userById = async (id) => {
  const sql = `SELECT id, name, email FROM users WHERE id = ? LIMIT 1`;
  const [rows] = await db.execute(sql, [id]);
  return rows[0];
};

const userByEmail = async (email) => {
  const sql = `SELECT * FROM users WHERE email = ? limit 1`;
  const [rows] = await db.execute(sql, [email]);
  return rows[0];
};

const updateUser = async (id, userData) => {
  //Aqui hacemos que si el usuario solo quiere cambiar el nombre, actualice el nombre y la contraseña no nos quede vacia o undefined y nos la suscriba y genere problemas al iniciar la sesion despues.
  const fields = [];
  const values = [];

  if (userData.name) {
    fields.push("name = ?");
    values.push(userData.name);
  }

  if (userData.password_hash) {
    fields.push("password_hash = ?");
    values.push(userData.password_hash);
  }

  if (fields.length === 0) {
    throw new Error("No hay datos para actualizar");
  }

  values.push(id);

  const sql = `
    UPDATE users
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

  const [result] = await db.execute(sql, values);
  return result;
};

const deleteUser = async (id) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

module.exports = { createUser, userById, userByEmail, updateUser, deleteUser };
