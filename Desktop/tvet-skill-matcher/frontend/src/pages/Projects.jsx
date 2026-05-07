import { useState, useEffect } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function Projects() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState([]);

  const addProject = async () => {
    await api.post("/projects", {
      title,
      description,
      studentId: user._id
    });

    alert("Project added!");
  };

  useEffect(() => {
    api.get(`/projects/${user._id}`)
      .then(res => setProjects(res.data));
  }, []);

  return (
    <Layout>
      <h1>📁 My Portfolio</h1>

      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e => setDescription(e.target.value)} />

      <button onClick={addProject}>Add Project</button>

      <h2>My Projects</h2>

      {projects.map(p => (
        <div style={styles.card} key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </Layout>
  );
}

const styles = {
  card: {
    background: "#151521",
    padding: "15px",
    marginTop: "10px",
    borderRadius: "10px"
  }
};