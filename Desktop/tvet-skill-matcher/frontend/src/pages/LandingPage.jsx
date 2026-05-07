import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="page">
      <h1>Smart TVET Skill Matcher</h1>
      <p>Skill-based matching for students and employers.</p>
      <div className="row">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
