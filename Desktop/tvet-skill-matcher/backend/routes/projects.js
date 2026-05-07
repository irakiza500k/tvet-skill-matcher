const express = require("express");
const multer = require("multer");
const path = require("path");
const Project = require("../models/Project");
const StudentProfile = require("../models/StudentProfile");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.post("/", auth, requireRole("student"), upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${path.basename(req.file.path)}` : "";
  const project = await Project.create({ title, description, image, studentId: req.user.userId });
  await StudentProfile.findOneAndUpdate({ userId: req.user.userId }, { $push: { projects: project._id } });
  return res.status(201).json(project);
});

router.get("/:studentId", async (req, res) => {
  const projects = await Project.find({ studentId: req.params.studentId }).sort({ createdAt: -1 });
  return res.json(projects);
});

router.put("/:projectId/rate", auth, requireRole("employer"), async (req, res) => {
  const value = Number(req.body.rating || 0);
  if (value < 1 || value > 5) return res.status(400).json({ message: "Rating must be 1-5" });
  const project = await Project.findById(req.params.projectId);
  if (!project) return res.status(404).json({ message: "Project not found" });
  const total = project.rating * project.ratingCount + value;
  project.ratingCount += 1;
  project.rating = total / project.ratingCount;
  await project.save();
  return res.json(project);
});

module.exports = router;