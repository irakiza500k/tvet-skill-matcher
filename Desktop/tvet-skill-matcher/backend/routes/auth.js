const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../middleware/auth");

const router = express.Router();

// Demo mode - in-memory storage
let users = [];

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const exists = users.find(u => u.email === email?.toLowerCase());
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = {
      _id: Date.now().toString(),
      name,
      email: email?.toLowerCase(),
      password: hashed,
      role
    };
    
    users.push(user);

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email?.toLowerCase());
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/me", auth, async (req, res) => {
  const user = users.find(u => u._id === req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  return res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
});

module.exports = router;