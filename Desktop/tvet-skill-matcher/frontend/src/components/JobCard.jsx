export default function JobCard({ job, score, onApply }) {
  return (
    <div style={styles.card}>
      <h3 style={{ color: "#ffd60a" }}>{job.title}</h3>

      <p>{job.description}</p>

      <p>⭐ Match Score: <b>{score || 0}%</b></p>

      <button style={styles.button} onClick={onApply}>
        Apply
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: "#151521",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    borderLeft: "4px solid #ffd60a"
  },
  button: {
    marginTop: "10px",
    background: "#ffd60a",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};