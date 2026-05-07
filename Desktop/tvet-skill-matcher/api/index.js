const authRoutes = require('./auth');
const projectRoutes = require('./projects');

module.exports = (req, res) => {
  // Handle different API routes
  if (req.path.startsWith('/api/auth')) {
    return authRoutes(req, res);
  }
  if (req.path.startsWith('/api/projects')) {
    return projectRoutes(req, res);
  }
  
  // Health check
  if (req.path === '/api/health') {
    return res.json({ ok: true });
  }
  
  res.status(404).json({ message: 'Route not found' });
};
