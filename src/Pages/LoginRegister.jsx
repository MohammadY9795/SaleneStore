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
            <span className="gold-text small mb-3">Use your email for registration</span>
            
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="number" placeholder="Phone Number" required />
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
            <h2 className="gold-text">Sign in to the world of SALENE</h2>
            
            <label className="gold-text small" htmlFor="signin-email">Email / Phone</label>
            <input id="signin-email" name="emailOrPhone" type="text" placeholder="Email or Phone" autoComplete="username" required aria-required="true" />
            
            <label className="gold-text small" htmlFor="signin-password">Password</label>
            <input id="signin-password" name="password" type="password" placeholder="Password" autoComplete="current-password" required aria-required="true" />
            
            <a href="#" className="text-muted small mt-2 text-decoration-none" style={{color: '#d4af37', fontSize: '12px'}}>
              Forgot your password?
            </a>
            <button type="submit" className="gold-border-btn">Sign In</button>
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
    </div>
  );
};

export default LoginRegister;