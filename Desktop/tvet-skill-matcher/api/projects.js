// Demo mode - in-memory storage
let projects = [];

const getAllProjects = async (req, res) => {
  try {
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, skillsRequired, category, duration } = req.body;
    const project = {
      _id: Date.now().toString(),
      title,
      description,
      skillsRequired,
      category,
      duration,
      postedBy: req.user?.userId || 'demo_user',
      createdAt: new Date().toISOString()
    };
    
    projects.push(project);
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = projects.find(p => p._id === id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProjects, createProject, getProjectById };
