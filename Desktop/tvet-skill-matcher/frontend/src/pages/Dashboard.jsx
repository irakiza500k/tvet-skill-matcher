import { useEffect, useState } from "react";
import api from "../services/api";
export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await api.get("/jobs");
      setJobs(res.data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Available Jobs</h2>

      {jobs.map((job) => (
        <div key={job._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <p>Skills: {job.requiredSkills?.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}