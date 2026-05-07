const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

// Import your existing routes
const authRoutes = require('../routes/auth');
const studentRoutes = require('../routes/student');
const employerRoutes = require('../routes/employer');
const projectRoutes = require('../routes/projects');
const applicationRoutes = require('../routes/applications');
const messageRoutes = require('../routes/messages');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/messages', messageRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
