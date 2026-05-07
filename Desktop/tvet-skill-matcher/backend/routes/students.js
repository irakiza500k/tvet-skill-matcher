const express = require("express");
const StudentProfile = require("../models/StudentProfile");
const User = require("../models/User");
const { auth, requireRole } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", auth, requireRole("student"), async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user.userId }).populate("projects");
  return res.json(profile || { userId: req.user.userId, skills: [], bio: "", projects: [] });
});

router.put("/profile", auth, requireRole("student"), async (req, res) => {
  const { skills = [], bio = "" } = req.body;
  const profile = await StudentProfile.findOneAndUpdate(
    { userId: req.user.userId },
    { skills, bio },
    { new: true, upsert: true }
  );
  return res.json(profile);
});

router.get("/search", auth, requireRole("employer"), async (req, res) => {
  const skill = (req.query.skill || "").toLowerCase();
  const profiles = await StudentProfile.find({
    skills: { $elemMatch: { $regex: new RegExp(skill, "i") } },
  })
    .populate("userId", "name email")
    .populate("projects");
  return res.json(profiles);
});

router.get("/all", async (_req, res) => {
  const profiles = await StudentProfile.find().populate("userId", "name email");
  return res.json(profiles);
});

router.get("/suggestions/me", auth, requireRole("student"), async (req, res) => {
  const profile = await StudentProfile.findOne({ userId: req.user.userId });
  if (!profile) return res.json({ suggestions: [] });
  const userSkills = profile.skills.map((s) => s.toLowerCase());
  const recommended = [];
  ["react", "communication", "teamwork", "problem-solving", "node.js"].forEach((s) => {
    if (!userSkills.includes(s)) recommended.push(`You should learn ${s} to match more jobs`);
  });
  return res.json({ suggestions: recommended.slice(0, 3) });
});

router.get("/:id/profile", async (req, res) => {
  const user = await User.findById(req.params.id).select("name email");
  const profile = await StudentProfile.findOne({ userId: req.params.id }).populate("projects");
  return res.json({ user, profile });
});

module.exports = router;
