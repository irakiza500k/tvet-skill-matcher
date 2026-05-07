const express = require("express");
const Job = require("../models/Job");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, requireRole("employer"), async (req, res) => {
  const { title, description, requiredSkills = [] } = req.body;
  const job = await Job.create({ title, description, requiredSkills, employerId: req.user.userId });
  return res.status(201).json(job);
});

router.get("/", async (_req, res) => {
  const jobs = await Job.find().populate("employerId", "name email");
  return res.json(jobs);
});

router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id).populate("employerId", "name email");
  if (!job) return res.status(404).json({ message: "Job not found" });
  return res.json(job);
});

module.exports = router;