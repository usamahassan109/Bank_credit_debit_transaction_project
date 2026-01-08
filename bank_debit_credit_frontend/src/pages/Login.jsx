import { useState, useContext } from "react";
import { loginApi } from "../api/auth.api.js";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) { alert("All fields required"); return; }

    try {
      const data = await loginApi({ username: email, password });
      login(data.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data);
      alert("Invalid credentials: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>Don't have account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}
