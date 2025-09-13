import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Fake delay to show loading (replace with API request)
    setTimeout(() => {
      if (email === "admin@copytrading.com" && password === "admin1234") {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      } else {
        setError("Invalid email or password ❌");
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-fade">
        <h1 className="login-title">🚀 Admin Panel</h1>
        <p className="login-subtitle">Welcome back! Please log in.</p>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <span className="spinner"></span> : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>Forgot password?</p>
        </div>
      </div>
    </div>
  );
}
