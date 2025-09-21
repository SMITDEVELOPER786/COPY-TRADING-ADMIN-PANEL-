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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotEmailError, setForgotEmailError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showAdminAnimation, setShowAdminAnimation] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [otpError, setOTPError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
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

  // Real-time forgot email validation
  useEffect(() => {
    if (forgotEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setForgotEmailError(emailRegex.test(forgotEmail.trim()) ? "" : "Invalid email format");
    } else {
      setForgotEmailError("");
    }
  }, [forgotEmail]);

  // Real-time new password validation
  useEffect(() => {
    if (newPassword) {
      setNewPasswordError(newPassword.length >= 6 ? "" : "Password must be at least 6 characters");
    } else {
      setNewPasswordError("");
    }
  }, [newPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShowAdminAnimation(true);

    if (emailError) {
      setError("Please fix the email format ❌");
      setLoading(false);
      setShowAdminAnimation(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters ❌");
      setLoading(false);
      setShowAdminAnimation(false);
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
      setShowAdminAnimation(false);
    }, 5000); // 5-second animation delay
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setLoading(true);

    if (forgotEmailError) {
      setResetMessage("Please fix the email format ❌");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (forgotEmail === "admin@copytrading.com") {
        setResetMessage("OTP sent to your email ✅");
        setShowOTP(true);
      } else {
        setResetMessage("Email not found ❌");
      }
      setLoading(false);
    }, 1500);
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setLoading(true);

    if (!otp || otp.length !== 6 || isNaN(otp)) {
      setOTPError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      if (otp === "123456") {
        setResetMessage("OTP verified successfully ✅");
        setShowOTP(false);
      } else {
        setResetMessage("Invalid OTP ❌");
      }
      setLoading(false);
    }, 1500);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setLoading(true);

    if (newPasswordError) {
      setResetMessage("Please fix the password format ❌");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setResetMessage("Password reset successfully ✅");
      setLoading(false);
      setTimeout(() => {
        setShowForgotPassword(false);
        setForgotEmail("");
        setNewPassword("");
        setResetMessage("");
      }, 1500);
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
        <img src="https://res.cloudinary.com/dfsruso6z/image/upload/v1757793542/af1a013a8912b47c6fc0f812dcf8d093452aced7_zyrkpp.png" alt="Turtle Trades Platform Logo" className="login-logo animate-logo" />
        <h1 id="login-title" className="login-title">Turtle Trades Admin</h1>
        <p className="login-subtitle">Securely manage your trading platform.</p>

        {showForgotPassword ? (
          <>
            <p className="login-subtitle">
              {showOTP
                ? "Enter the 6-digit OTP sent to your email."
                : !resetMessage.includes("OTP verified")
                ? "Enter your email to reset your password."
                : "Enter your new password."}
            </p>
            {resetMessage && (
              <p className={`login-${resetMessage.includes("✅") ? "success" : "error"}`} role="alert">
                {resetMessage}
              </p>
            )}
            <form
              onSubmit={
                showOTP
                  ? handleOTPVerification
                  : resetMessage.includes("OTP verified")
                  ? handlePasswordReset
                  : handleForgotPassword
              }
              className="login-form"
              noValidate
            >
              {showOTP ? (
                <div className="input-group">
                  <label htmlFor="otp" className="sr-only">OTP</label>
                  <input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value.trim())}
                    required
                    aria-required="true"
                    aria-describedby="otp-error"
                    aria-invalid={!!otpError}
                  />
                  {otpError && <p className="input-error" id="otp-error">{otpError}</p>}
                </div>
              ) : resetMessage.includes("OTP verified") ? (
                <div className="input-group password-group">
                  <label htmlFor="new-password" className="sr-only">New Password</label>
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    aria-required="true"
                    aria-describedby="new-password-error"
                    aria-invalid={!!newPasswordError}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    <span className="toggle-icon">
                      {showNewPassword ? <FaEye /> : <FaEyeSlash />}
                    </span>
                  </button>
                  {newPasswordError && <p className="input-error" id="new-password-error">{newPasswordError}</p>}
                </div>
              ) : (
                <div className="input-group">
                  <label htmlFor="forgot-email" className="sr-only">Email</label>
                  <input
                    id="forgot-email"
                    type="email"
                    placeholder="Email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value.trim())}
                    required
                    aria-required="true"
                    aria-describedby="forgot-email-error"
                    aria-invalid={!!forgotEmailError}
                  />
                  {forgotEmailError && <p className="input-error" id="forgot-email-error">{forgotEmailError}</p>}
                </div>
              )}
              <button
                type="submit"
                className="login-button"
                disabled={loading || !!forgotEmailError || !!otpError || !!newPasswordError}
                aria-disabled={loading || !!forgotEmailError || !!otpError || !!newPasswordError}
              >
                {loading ? (
                  <span className="spinner" aria-hidden="true">
                    <svg className="animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  </span>
                ) : showOTP ? (
                  "Verify OTP"
                ) : resetMessage.includes("OTP verified") ? (
                  "Reset Password"
                ) : (
                  "Send Reset Link"
                )}
              </button>
              <div className="login-footer">
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setShowOTP(false);
                    setForgotEmail("");
                    setOTP("");
                    setNewPassword("");
                    setResetMessage("");
                    setOTPError("");
                    setNewPasswordError("");
                  }}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
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
                  <span className="spinner" aria-hidden="true">
                    <svg className="animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Checking details...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

           
          </>
        )}
      </div>

      {showAdminAnimation && (
        <div className="admin-animation" aria-hidden="true">
          <div className="animation-content animate-pop">
            <img
              src="https://res.cloudinary.com/dfsruso6z/image/upload/v1757793542/af1a013a8912b47c6fc0f812dcf8d093452aced7_zyrkpp.png"
              alt="Turtle Trades Logo"
              className="animation-logo animate-logo"
            />
            <h2>Admin Access Loading</h2>
            <p>Verifying credentials...</p>
            <div className="animation-progress">
              <div className="progress-fill animate-progress"></div>
            </div>
            <div className="animation-particles">
              {[...Array(10)].map((_, i) => (
                <span key={i} className={`particle particle-${i}`}></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
