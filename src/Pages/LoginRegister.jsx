import React, { useState } from "react";
import "./LoginRegister.css";
import logo from "../assets/images/SALENE_LOGO.png"; 

const LoginRegister = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const handleSignUpClick = () => setIsRightPanelActive(true);
  const handleSignInClick = () => setIsRightPanelActive(false);

  return (
    <div className="login-register-page">
      <div className={`container-slider ${isRightPanelActive ? "right-panel-active" : ""}`}>
        
        {/* --- REGISTER FORM (Moves to Right) --- */}
        <div className="form-container sign-up-container">
          <form className="form-wrapper">
            <h2 className="gold-text">Create Account</h2>
            <span className="text-muted small mb-3">Use your email for registration</span>
            
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            
            <button className="gold-border-btn">Sign Up</button>
          </form>
        </div>

        {/* --- LOGIN FORM (Starts on Left) --- */}
        <div className="form-container sign-in-container">
          <form className="form-wrapper">
            {/* Added Logo Here */}
            <img src={logo} alt="SALENE" className="salene-logo" />
            <h2 className="gold-text">Sign in to SALENE</h2>
            <span className="text-muted small mb-3">or use your email account</span>
            
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            
            <a href="#" className="text-muted small mt-2 text-decoration-none" style={{color: '#aaa', fontSize: '12px'}}>
              Forgot your password?
            </a>
            <button className="gold-border-btn">Sign In</button>
          </form>
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <div className="overlay-container">
          <div className="overlay">
            
            {/* Left Overlay (Shows when you need to switch to Login) */}
            <div className="overlay-panel overlay-left">
              <h2 className="gold-text-dark">Welcome Back!</h2>
              <p className="text-description">To keep connected with us please login with your personal info</p>
              <button className="dark-border-btn" onClick={handleSignInClick}>
                Sign In
              </button>
            </div>

            {/* Right Overlay (Shows when you need to switch to Sign Up) */}
            <div className="overlay-panel overlay-right">
              <h2 className="gold-text-dark">Hello, Friend!</h2>
              <p className="text-description">Enter your personal details and start your journey of luxury</p>
              <button className="dark-border-btn" onClick={handleSignUpClick}>
                Sign Up
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;