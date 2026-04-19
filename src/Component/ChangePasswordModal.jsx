import React, { useState } from "react";
import "./ChangePasswordModal.css";

const ChangePasswordModal = ({ isOpen, onClose, user, onPasswordChange }) => {
  const [step, setStep] = useState(1); // 1: Choose method, 2: Enter OTP, 3: New Password, 4: Success
  const [otpMethod, setOtpMethod] = useState("email"); // "email" or "phone"
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      // Simulate OTP generation and sending
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`OTP sent to ${otpMethod === "email" ? user?.email : user?.phone}: ${newOtp}`);

      setStep(2);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    setError("");

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp !== generatedOtp) {
      setError("Incorrect OTP. Please try again.");
      return;
    }

    setStep(3);
  };

  const handleSetPassword = () => {
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return;
    }

    setStep(4);
    if (onPasswordChange) {
      onPasswordChange(newPassword);
    }
  };

  const handleClose = () => {
    setStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setGeneratedOtp("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          ✕
        </button>

        {/* Step 1: Choose OTP Method */}
        {step === 1 && (
          <div className="modal-body">
            <h2 className="modal-title">Change Password</h2>
            <p className="modal-subtitle">Select how you'd like to receive your OTP</p>

            <div className="otp-method-group">
              <label className="otp-method-option">
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  checked={otpMethod === "email"}
                  onChange={(e) => setOtpMethod(e.target.value)}
                />
                <span className="otp-method-label">
                  📧 Email
                  <br />
                  <small>{user?.email}</small>
                </span>
              </label>

              <label className="otp-method-option">
                <input
                  type="radio"
                  name="otpMethod"
                  value="phone"
                  checked={otpMethod === "phone"}
                  onChange={(e) => setOtpMethod(e.target.value)}
                />
                <span className="otp-method-label">
                  📱 Phone
                  <br />
                  <small>{user?.phone}</small>
                </span>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              className="btn-primary"
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <div className="modal-body">
            <h2 className="modal-title">Verify OTP</h2>
            <p className="modal-subtitle">
              Enter the OTP sent to your {otpMethod === "email" ? "email" : "phone"}
            </p>

            <input
              type="text"
              className="otp-input"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength="6"
            />

            {error && <div className="error-message">{error}</div>}

            <button className="btn-primary" onClick={handleVerifyOtp}>
              Verify OTP
            </button>

            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <div className="modal-body">
            <h2 className="modal-title">Set New Password</h2>
            <p className="modal-subtitle">Enter your new password</p>

            <input
              type="password"
              className="password-input"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              className="password-input"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <div className="error-message">{error}</div>}

            <button className="btn-primary" onClick={handleSetPassword}>
              Change Password
            </button>

            <button className="btn-secondary" onClick={() => setStep(2)}>
              Back
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="modal-body success-body">
            <div className="success-icon">✓</div>
            <h2 className="modal-title">Password Changed Successfully!</h2>
            <p className="modal-subtitle">
              Your password has been updated. You can now log in with your new password.
            </p>

            <button className="btn-primary" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
