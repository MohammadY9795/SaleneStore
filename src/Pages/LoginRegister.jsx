import React, { useState } from "react";
import "./LoginRegister.css";
import logo from "../assets/images/SALENE_LOGO.png";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../Component/ForgotPasswordModal";

const LoginRegister = () => {
  const { register: authRegister, login: authLogin, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const [registerData, setRegisterData] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loginData, setLoginData] = useState({ emailOrPhone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUpClick = () => {
    setError("");
    setIsRightPanelActive(true);
  };
  const handleSignInClick = () => {
    setError("");
    setIsRightPanelActive(false);
  };

  const onRegisterChange = (e) => setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  const onLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const { name, email, password, confirmPassword, phone } = registerData;
    if (!name || !email || !password || !confirmPassword) return setError("Please fill all required fields.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);
    try {
      await authRegister(name, email, password, phone);
      setRegisterData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
      setError("");
      setIsRightPanelActive(false);
      // Redirect to home after successful registration
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const { emailOrPhone, password } = loginData;
    if (!emailOrPhone || !password) return setError("Please provide email and password.");

    setLoading(true);
    try {
      await authLogin(emailOrPhone, password);
      setLoginData({ emailOrPhone: "", password: "" });
      setError("");
      // Redirect to home after successful login
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      setError(err.message || "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordReset = async (userId, newPassword) => {
    try {
      await updatePassword(newPassword);
      // Close modal after password reset
      setIsForgotPasswordOpen(false);
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  return (
    <div className="login-register-page">
      <div className={`container-slider ${isRightPanelActive ? "right-panel-active" : ""}`}>

        {/* --- REGISTER FORM (Moves to Right) --- */}
        <div className="form-container sign-up-container">
          <form className="form-wrapper" onSubmit={handleRegister}>
            <h2 className="gold-text">Create Account</h2>
            <span className="gold-text small mb-3">Use your email for registration</span>

            <input name="name" value={registerData.name} onChange={onRegisterChange} type="text" placeholder="Name" required />
            <input name="email" value={registerData.email} onChange={onRegisterChange} type="email" placeholder="Email" required />
            <input name="phone" value={registerData.phone} onChange={onRegisterChange} type="tel" placeholder="Phone Number (optional)" />
            <input name="password" value={registerData.password} onChange={onRegisterChange} type="password" placeholder="Password" required />
            <input name="confirmPassword" value={registerData.confirmPassword} onChange={onRegisterChange} type="password" placeholder="Confirm Password" required />

            {error && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</div>}
            <button type="submit" className="gold-border-btn" disabled={loading}>{loading ? "Please wait..." : "Sign Up"}</button>
          </form>
        </div>

        {/* --- LOGIN FORM (Starts on Left) --- */}
        <div className="form-container sign-in-container">
          <form className="form-wrapper" onSubmit={handleLogin}>
            {/* Added Logo Here */}
            <img src={logo} alt="SALENE" className="salene-logo" />
            <h2 className="gold-text">Sign in to the world of SALENE</h2>

            <label className="gold-text small" htmlFor="signin-email">Email</label>
            <input id="signin-email" name="emailOrPhone" value={loginData.emailOrPhone} onChange={onLoginChange} type="text" placeholder="Email" autoComplete="username" required aria-required="true" />

            <label className="gold-text small" htmlFor="signin-password">Password</label>
            <input id="signin-password" name="password" value={loginData.password} onChange={onLoginChange} type="password" placeholder="Password" autoComplete="current-password" required aria-required="true" />

            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => setIsForgotPasswordOpen(true)}
            >
              Forgot your password?
            </button>
            {error && <div style={{ color: "#ff6b6b", marginTop: 8 }}>{error}</div>}
            <button type="submit" className="gold-border-btn" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
          </form>
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <div className="overlay-container">
          <div className="overlay">

            {/* Left Overlay (Shows when you need to switch to Login) */}
            <div className="overlay-panel overlay-left">
              <h2 className="gold-text-dark">Already part of the story?</h2>
              <p className="text-description">Sign in to continue your journey.</p>
              <button className="dark-border-btn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>

            {/* Right Overlay (Shows when you need to switch to Sign Up) */}
            <div className="overlay-panel overlay-right">
              <h2 className="gold-text-dark">Welcome back FRIEND!!</h2>
              <p className="text-description">Your Signature Scent Awaits
Log in to SALENE and rediscover the essence of elegance. We’re glad to have you back.</p>
              <button className="dark-border-btn" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onPasswordReset={handleForgotPasswordReset}
      />
    </div>
  );
};

export default LoginRegister;