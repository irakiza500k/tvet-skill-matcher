const db = require("../db/db");


const createUser = async (name, email, age) => {
  const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if (existing.length > 0) {
    throw new Error("Email already exists");
  }

  const [result] = await db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age]
  );

  return result;
};

const getAllUsers = async (search, page, limit) => {
  const offset = (page - 1) * limit;

  let sql = "SELECT * FROM users WHERE 1=1";
  const params = [];

  if (search) {
    sql += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  sql += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  const [rows] = await db.query(sql, params);
  return rows;
};


const getUserById = async (id) => {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

const updateUser = async (id, name, email, age) => {
  const [result] = await db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, id]
  );

  return result;
};


const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};