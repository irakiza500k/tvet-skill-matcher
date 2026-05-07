const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, requireRole("student"), async (req, res) => {
  try {
    const { jobId } = req.body;
    const application = await Application.create({ jobId, studentId: req.user.userId });
    return res.status(201).json(application);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/", auth, async (req, res) => {
  if (req.user.role === "student") {
    const apps = await Application.find({ studentId: req.user.userId }).populate("jobId");
    return res.json(apps);
  }
  const jobs = await Job.find({ employerId: req.user.userId }).select("_id");
  const jobIds = jobs.map((j) => j._id);
  const apps = await Application.find({ jobId: { $in: jobIds } }).populate("jobId studentId", "name email");
  return res.json(apps);
});

router.put("/:id", auth, requireRole("employer"), async (req, res) => {
  const { status } = req.body;
  const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
  return res.json(app);
});

module.exports = router;
