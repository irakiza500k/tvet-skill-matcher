const userService = require("../services/userService");


exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const result = await userService.createUser(name, email, age);
    res.status(201).json({ message: "User created", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const users = await userService.getAllUsers(search, page, limit);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    await userService.updateUser(req.params.id, name, email, age);
    res.json({ message: "User updated" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};