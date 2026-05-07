import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function EmployerApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    api.get("/applications")
      .then(res => setApps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <h1>Applications</h1>

      {apps.map(app => (
        <div key={app.id}>
          <h3>{app.jobTitle}</h3>
          <p>{app.studentName}</p>
          <p>{app.status}</p>
        </div>
      ))}
    </Layout>
  );
}