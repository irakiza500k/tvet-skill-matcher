const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "employer"], required: true },
  },
  { timestamps: true }
);

userSchema.statics.findById = async function (id) {
  const sql = `
    SELECT id, name, email, role
    FROM users
    WHERE id = ?
  `;
  
  const users = await query(sql, [id]);
  return users[0] || null;
};

userSchema.statics.findByEmail = async function (email) {
  const sql = `
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ?
  `;
  
  const users = await query(sql, [email]);
  return users[0] || null;
};

module.exports = mongoose.model("User", userSchema);