import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function StudentApplications() {
  const [apps, setApps] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    api.get(`/applications/student/${user.id}`)
      .then(res => setApps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <h1>My Applications</h1>

      {apps.length === 0 && <p>No applications yet</p>}

      {apps.map(app => (
        <div key={app.id}>
          <h3>{app.jobTitle}</h3>
          <p>{app.status}</p>
        </div>
      ))}
    </Layout>
  );
}