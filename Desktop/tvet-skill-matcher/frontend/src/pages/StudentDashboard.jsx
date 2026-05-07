import { useEffect, useState } from "react";
import api from "../services/api";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

export default function StudentDashboard() {
  const [profile, setProfile] = useState({ skills: "", bio: "" });
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);
  const [project, setProject] = useState({ title: "", description: "" });
  const [suggestions, setSuggestions] = useState([]);
  const [chatTo, setChatTo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get("/student/profile").then((res) => setProfile({ skills: res.data?.skills?.join(", ") || "", bio: res.data?.bio || "" }));
    api.get("/match/jobs-for-student").then((res) => setJobs(res.data));
    api.get("/applications").then((res) => setApps(res.data));
    api.get("/student/suggestions/me").then((res) => setSuggestions(res.data.suggestions || []));
  }, []);

  const applyJob = async (jobId) => {
    await api.post("/apply", { jobId });
    const { data } = await api.get("/applications");
    setApps(data);
  };

  const saveProfile = async () => {
    await api.put("/student/profile", { skills: profile.skills.split(",").map((s) => s.trim()).filter(Boolean), bio: profile.bio });
    const { data } = await api.get("/match/jobs-for-student");
    setJobs(data);
  };

  const uploadProject = async () => {
    await api.post("/projects", project);
    setProject({ title: "", description: "" });
  };

  const openChat = () => {
    const socket = io(SOCKET_URL, { auth: { token: localStorage.getItem("token") } });
    socket.on("private_message", (m) => setMessages((prev) => [...prev, m]));
    socket.emit("private_message", { to: chatTo, content: message });
    setMessage("");
  };

  return (
    <div className="page">
      <h1>Student Dashboard</h1>
      <h3>Profile</h3>
      <input placeholder="Skills (comma-separated)" value={profile.skills} onChange={(e) => setProfile({ ...profile, skills: e.target.value })} />
      <input placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
      <button onClick={saveProfile}>Save profile</button>
      <h3>AI Suggestions</h3>
      {suggestions.map((s) => <p key={s}>{s}</p>)}
      <h3>Upload Project</h3>
      <input placeholder="Title" value={project.title} onChange={(e) => setProject({ ...project, title: e.target.value })} />
      <input placeholder="Description" value={project.description} onChange={(e) => setProject({ ...project, description: e.target.value })} />
      <button onClick={uploadProject}>Upload</button>
      <h3>Best Jobs</h3>
      {jobs.map((item) => (
        <div key={item.job._id} className="card">
          <p>{item.job.title}</p>
          <p>Score: {(item.matchScore * 100).toFixed(0)}%</p>
          <button onClick={() => applyJob(item.job._id)}>Apply</button>
        </div>
      ))}
      <h3>Applications</h3>
      {apps.map((a) => <p key={a._id}>{a.jobId?.title || "Job"} - {a.status}</p>)}
      <h3>Chat</h3>
      <input placeholder="Employer user id" value={chatTo} onChange={(e) => setChatTo(e.target.value)} />
      <input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={openChat}>Send message</button>
      {messages.map((m) => <p key={m._id || Math.random()}>{m.content}</p>)}
    </div>
  );
}