const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// In-memory storage for demo mode
let users = [];

const register = async (req, res) => {
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
};

const login = async (req, res) => {
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
};

const getMe = async (req, res) => {
  try {
    // For demo, we'll skip auth middleware and get user from token
    const user = users.find(u => u._id === req.user?.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, getMe };
