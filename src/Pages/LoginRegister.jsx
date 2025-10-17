import React, { useState } from "react";
import "./LoginRegister.css";
import { Form, Button } from "react-bootstrap";
import logo from "../assets/images/SALENE_LOGO.png"; // replace with your logo path

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="login-register-page d-flex align-items-center justify-content-center text-white">
      <div className="login-card p-4">
        <div className="text-center mb-4" style={{marginTop: '-10px'}}>
          <img src={logo} alt="SALENE Logo" className="salene-logo mb-2" />
          <h2 className="gold-text fw-bold">{isLogin ? "Welcome Back" : "Join SALENE"}</h2>
          <p className="text-muted">{isLogin ? "Luxury in Every Login" : "Sign up to discover timeless luxury"}</p>
        </div>

        <Form>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label className="gold-text">Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="gold-text">Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label className="gold-text">Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Re-enter your password" />
            </Form.Group>
          )}

          <Button variant="outline-light" className="w-100 mt-3 gold-border-btn">
            {isLogin ? "Login" : "Register"}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="gold-text toggle-link" onClick={handleToggle}>
              {isLogin ? "Register" : "Login"}
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;