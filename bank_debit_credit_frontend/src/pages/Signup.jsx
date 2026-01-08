import { useState } from "react";
import { signupApi } from "../api/auth.api.js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) { alert("All fields required"); return; }

    try {
      await signupApi({ name, email, password });
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data);
      alert("Signup failed: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Signup</h2>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
        <p>Already have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
