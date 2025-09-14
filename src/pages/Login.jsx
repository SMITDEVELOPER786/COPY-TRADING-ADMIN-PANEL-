import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  // Real-time email validation
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(emailRegex.test(email.trim()) ? "" : "Invalid email format");
    } else {
      setEmailError("");
    }
  }, [email]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (emailError) {
      setError("Please fix the email format ❌");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (email === "admin@copytrading.com" && password === "admin1234") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", "sample-jwt-token");
        navigate("/");
      } else {
        setError("Invalid email or password ❌");
      }
      setLoading(false);
    }, 1500);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`login-wrapper ${theme}`}>
      <div className="particle-background" aria-hidden="true"></div>
      <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <div className="login-card animate-pop" role="region" aria-labelledby="login-title">
        <img src="https://res.cloudinary.com/dfsruso6z/image/upload/v1757793542/af1a013a8912b47c6fc0f812dcf8d093452aced7_zyrkpp.png" alt="Turtle Trades Platform Logo" className="login-logo" />
        <h1 id="login-title" className="login-title">Turtle Trades Admin</h1>
        <p className="login-subtitle">Securely manage your trading platform.</p>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="login-form" noValidate>
          <div className="input-group">
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              aria-required="true"
              aria-describedby="email-error"
              aria-invalid={!!emailError}
            />
            {emailError && <p className="input-error" id="email-error">{emailError}</p>}
          </div>

          <div className="input-group password-group">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              aria-describedby="password-error"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password with dots" : "Show password"}
            >
              <span className="toggle-icon">
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </button>
          </div>

          <div className="input-group checkbox-group">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              aria-label="Remember me"
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading || !!emailError}
            aria-disabled={loading || !!emailError}
          >
            {loading ? (
              <span className="progress-bar" aria-hidden="true">
                <span className="progress-fill"></span>
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password" className="forgot-password-link">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}