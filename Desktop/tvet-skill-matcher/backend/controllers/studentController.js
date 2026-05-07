const { body, validationResult } = require('express-validator');
const StudentProfile = require('../models/StudentProfile');
const Project = require('../models/Project');
const User = require('../models/User');

// Validation rules
const profileValidation = [
  body('bio').optional().trim().isLength({ max: 1000 }).withMessage('Bio must not exceed 1000 characters'),
  body('skills').optional().isArray().withMessage('Skills must be an array'),
  body('skills.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Each skill must be between 1 and 50 characters'),
  body('education').optional().trim().isLength({ max: 255 }).withMessage('Education must not exceed 255 characters'),
  body('location').optional().trim().isLength({ max: 255 }).withMessage('Location must not exceed 255 characters'),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL')
];

const projectValidation = [
  body('title').trim().isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters'),
  body('description').trim().isLength({ min: 10, max: 2000 }).withMessage('Description must be between 10 and 2000 characters'),
  body('technologies').optional().isArray().withMessage('Technologies must be an array'),
  body('technologies.*').optional().trim().isLength({ min: 1, max: 50 }).withMessage('Each technology must be between 1 and 50 characters'),
  body('projectUrl').optional().isURL().withMessage('Project URL must be a valid URL'),
  body('githubUrl').optional().isURL().withMessage('GitHub URL must be a valid URL'),
  body('status').optional().isIn(['draft', 'published']).withMessage('Status must be either draft or published')
];

// Get student profile
const getProfile = async (req, res) => {
  try {
    const profile = await StudentProfile.findByUserId(req.user.id);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { profile }
    });
  } catch (error) {
    console.error('Get student profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student profile'
    });
  }
};

// Create or update student profile
const createOrUpdateProfile = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { bio, skills, education, location, avatar } = req.body;

    // Check if profile already exists
    const existingProfile = await StudentProfile.findByUserId(req.user.id);
    
    let profile;
    if (existingProfile) {
      // Update existing profile
      profile = await StudentProfile.update(existingProfile.id, {
        bio: bio || existingProfile.bio,
        skills: skills || existingProfile.skills,
        education: education || existingProfile.education,
        location: location || existingProfile.location,
        avatar: avatar || existingProfile.avatar
      });
    } else {
      // Create new profile
      profile = await StudentProfile.create({
        userId: req.user.id,
        bio,
        skills: skills || [],
        education,
        location,
        avatar
      });
    }

    res.status(200).json({
      success: true,
      message: existingProfile ? 'Profile updated successfully' : 'Profile created successfully',
      data: { profile }
    });
  } catch (error) {
    console.error('Create/update student profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to save student profile'
    });
  }
};

// Get student's projects
const getProjects = async (req, res) => {
  try {
    const profile = await StudentProfile.findByUserId(req.user.id);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    const { page = 1, limit = 10, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.findByStudentId(profile.id, parseInt(limit), offset);
    const projectStats = await Project.getProjectCountByStudent(profile.id);

    res.status(200).json({
      success: true,
      data: {
        projects,
        stats: projectStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: projectStats.total_projects
        }
      }
    });
  } catch (error) {
    console.error('Get student projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student projects'
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Get student profile
    const profile = await StudentProfile.findByUserId(req.user.id);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found. Please create a profile first.'
      });
    }

    const { title, description, technologies, projectUrl, githubUrl, status = 'draft' } = req.body;
    
    // Handle file upload if present
    let image = null;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const project = await Project.create({
      studentId: profile.id,
      title,
      description,
      image,
      technologies: technologies || [],
      projectUrl,
      githubUrl,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: { project }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project'
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const { title, description, technologies, projectUrl, githubUrl, status } = req.body;

    // Get project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check ownership
    const studentProfile = await StudentProfile.findByUserId(req.user.id);
    if (!studentProfile || project.student_id !== studentProfile.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own projects'
      });
    }

    // Handle file upload if present
    let image = project.image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const updatedProject = await Project.update(id, {
      title: title || project.title,
      description: description || project.description,
      image,
      technologies: technologies || project.technologies,
      projectUrl: projectUrl || project.project_url,
      githubUrl: githubUrl || project.github_url,
      status: status || project.status
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: { project: updatedProject }
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update project'
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Get project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check ownership
    const studentProfile = await StudentProfile.findByUserId(req.user.id);
    if (!studentProfile || project.student_id !== studentProfile.id) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own projects'
      });
    }

    const deleted = await Project.delete(id);
    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete project'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
};

// Get student dashboard data
const getDashboard = async (req, res) => {
  try {
    const profile = await StudentProfile.findByUserId(req.user.id);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Student profile not found'
      });
    }

    // Get projects
    const projects = await Project.findByStudentId(profile.id, 5, 0);
    const projectStats = await Project.getProjectCountByStudent(profile.id);

    // Get popular skills
    const popularSkills = await StudentProfile.getPopularSkills(10);

    res.status(200).json({
      success: true,
      data: {
        profile,
        projects: projects.slice(0, 3), // Recent 3 projects
        stats: projectStats,
        popularSkills
      }
    });
  } catch (error) {
    console.error('Get student dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard data'
    });
  }
};

// Search students (for employers)
const searchStudents = async (req, res) => {
  try {
    const { 
      q: searchTerm, 
      skills, 
      location, 
      page = 1, 
      limit = 20 
    } = req.query;

    let students = [];
    
    if (skills) {
      const skillArray = Array.isArray(skills) ? skills : skills.split(',');
      students = await StudentProfile.findBySkills(skillArray, parseInt(limit));
    } else if (location) {
      students = await StudentProfile.findByLocation(location, parseInt(limit));
    } else if (searchTerm) {
      students = await StudentProfile.search(searchTerm, parseInt(limit));
    } else {
      students = await StudentProfile.findAll(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));
    }

    res.status(200).json({
      success: true,
      data: {
        students,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: students.length
        }
      }
    });
  } catch (error) {
    console.error('Search students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search students'
    });
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getDashboard,
  searchStudents,
  profileValidation,
  projectValidation
};
