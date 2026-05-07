import { useState, useEffect } from "react";
import api from "../services/api";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080";

export default function EmployerDashboard() {
  const [job, setJob] = useState({
    title: "",
    description: "",
    requiredSkills: ""
  });

  const [apps, setApps] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");
  const [matchedStudents, setMatchedStudents] = useState([]);
  const [chatTo, setChatTo] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const createJob = async () => {
    await api.post("/jobs", {
      title: job.title,
      description: job.description,
      requiredSkills: job.requiredSkills.split(",")
    });

    const jobsRes = await api.get("/jobs");
    setJobs(jobsRes.data);
  };

  useEffect(() => {
    api.get("/applications").then(res => setApps(res.data));
    api.get("/jobs").then((res) => setJobs(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/application/${id}`, { status });
    const { data } = await api.get("/applications");
    setApps(data);
  };

  const searchStudents = async () => {
    const { data } = await api.get(`/student/search?skill=${encodeURIComponent(searchSkill)}`);
    setStudents(data);
  };

  const matchForJob = async () => {
    const { data } = await api.get(`/match/students-for-job/${selectedJobId}`);
    setMatchedStudents(data);
  };

  const sendChat = () => {
    const socket = io(SOCKET_URL, { auth: { token: localStorage.getItem("token") } });
    socket.on("private_message", (m) => setMessages((prev) => [...prev, m]));
    socket.emit("private_message", { to: chatTo, content: message });
    setMessage("");
  };

  return (
    <div className="page">
      <h1>🏢 Employer Dashboard</h1>
      <div className="card">
        <h2>Create Job</h2>

        <input placeholder="Title"
          onChange={e => setJob({ ...job, title: e.target.value })}
        />

        <input placeholder="Description"
          onChange={e => setJob({ ...job, description: e.target.value })}
        />

        <input placeholder="Skills (comma separated)"
          onChange={e => setJob({ ...job, requiredSkills: e.target.value })}
        />

        <button onClick={createJob}>Post Job</button>
      </div>
      <h2>Search Students by Skill</h2>
      <input placeholder="skill e.g welding" value={searchSkill} onChange={(e) => setSearchSkill(e.target.value)} />
      <button onClick={searchStudents}>Search</button>
      {students.map((s) => <p key={s._id}>{s.userId?.name} - {s.skills.join(", ")}</p>)}
      <h2>Best Candidates For Job</h2>
      <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
        <option value="">Select job</option>
        {jobs.map((j) => <option key={j._id} value={j._id}>{j.title}</option>)}
      </select>
      <button onClick={matchForJob}>Match</button>
      {matchedStudents.map((m) => <p key={m.student._id}>{m.student.userId?.name} - {(m.matchScore * 100).toFixed(0)}%</p>)}
      <h2>📩 Applications</h2>

      {apps.map(app => (
        <div className="card" key={app._id}>
          <p>Job: {app.jobId?.title || app.jobId}</p>
          <p>Student: {app.studentId?.name || app.studentId}</p>
          <p>Status: {app.status}</p>
          <button onClick={() => updateStatus(app._id, "accepted")}>Accept</button>
          <button onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
        </div>
      ))}
      <h2>Chat</h2>
      <input placeholder="Student user id" value={chatTo} onChange={(e) => setChatTo(e.target.value)} />
      <input placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendChat}>Send</button>
      {messages.map((m) => <p key={m._id || Math.random()}>{m.content}</p>)}
    </div>
  );
}