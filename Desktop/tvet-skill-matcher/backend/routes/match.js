const express = require("express");
const StudentProfile = require("../models/StudentProfile");
const Job = require("../models/Job");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

function calculateMatch(studentSkills, jobSkills) {
  if (!jobSkills.length) return 0;
  const set = new Set(studentSkills.map((s) => s.toLowerCase()));
  const matchCount = jobSkills.filter((s) => set.has(s.toLowerCase())).length;
  return matchCount / jobSkills.length;
}

router.get("/jobs-for-student", auth, requireRole("student"), async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user.userId });
  const skills = profile?.skills || [];
  const jobs = await Job.find();
  const matches = jobs
    .map((job) => ({ job, matchScore: calculateMatch(skills, job.requiredSkills) }))
    .sort((a, b) => b.matchScore - a.matchScore);
  return res.json(matches);
});

router.get("/students-for-job/:jobId", auth, requireRole("employer"), async (req, res) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  const students = await StudentProfile.find().populate("userId", "name email");
  const matches = students
    .map((student) => ({
      student,
      matchScore: calculateMatch(student.skills, job.requiredSkills),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
  return res.json(matches);
});

module.exports = router;