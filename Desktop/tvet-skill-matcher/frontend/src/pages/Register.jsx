import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const register = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);
      navigate(data.user.role === "student" ? "/student" : "/employer");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <form className="page" onSubmit={register}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      >
        <option value="student">Student</option>
        <option value="employer">Employer</option>
      </select>

      <button type="submit">Create Account</button>
    </form>
  );
}