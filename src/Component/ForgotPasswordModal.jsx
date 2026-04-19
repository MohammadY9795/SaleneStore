import React, { useState } from "react";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ isOpen, onClose, onPasswordReset }) => {
  const [step, setStep] = useState(1); // 1: Enter email/phone, 2: Choose OTP method, 3: Enter OTP, 4: New Password, 5: Success
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [otpMethod, setOtpMethod] = useState("email");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const DEMO_USERS = [
    { id: 1, name: "Demo User", email: "demo@salene.com", password: "demo123", phone: "555-0001" },
    { id: 2, name: "Test User", email: "test@salene.com", password: "test123", phone: "555-0002" },
  ];

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleFindUser = async () => {
    setError("");

    if (!emailOrPhone) {
      setError("Please enter your email or phone number.");
      return;
    }

    setLoading(true);
    try {
      // Find user by email or phone
      const user = DEMO_USERS.find(
        (u) => u.email === emailOrPhone || u.phone === emailOrPhone
      );

      if (!user) {
        setError("No account found with this email or phone number.");
        setLoading(false);
        return;
      }

      setFoundUser(user);
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(
        `OTP sent to ${otpMethod === "email" ? foundUser?.email : foundUser?.phone}: ${newOtp}`
      );

      setStep(3);
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

    setStep(4);
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

    setStep(5);
    if (onPasswordReset) {
      onPasswordReset(foundUser?.id, newPassword);
    }
  };

  const handleClose = () => {
    setStep(1);
    setEmailOrPhone("");
    setFoundUser(null);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setGeneratedOtp("");
    setOtpMethod("email");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-forgot" onClick={handleClose}>
      <div className="modal-content-forgot" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-forgot" onClick={handleClose}>
          ✕
        </button>

        {/* Step 1: Find User */}
        {step === 1 && (
          <div className="modal-body-forgot">
            <h2 className="modal-title-forgot">Forgot Password?</h2>
            <p className="modal-subtitle-forgot">
              Enter your email or phone number to reset your password
            </p>

            <input
              type="text"
              className="forgot-input"
              placeholder="Email or Phone Number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />

            {error && <div className="error-message-forgot">{error}</div>}

            <button
              className="btn-primary-forgot"
              onClick={handleFindUser}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Searching...
                </>
              ) : (
                "Find Account"
              )}
            </button>
          </div>
        )}

        {/* Step 2: Choose OTP Method */}
        {step === 2 && (
          <div className="modal-body-forgot">
            <h2 className="modal-title-forgot">Select OTP Method</h2>
            <p className="modal-subtitle-forgot">
              How would you like to receive your OTP?
            </p>

            <div className="otp-method-group-forgot">
              <label className="otp-method-option-forgot">
                <input
                  type="radio"
                  name="otpMethod"
                  value="email"
                  checked={otpMethod === "email"}
                  onChange={(e) => setOtpMethod(e.target.value)}
                />
                <span className="otp-method-label-forgot">
                  📧 Email
                  <br />
                  <small>{foundUser?.email}</small>
                </span>
              </label>

              <label className="otp-method-option-forgot">
                <input
                  type="radio"
                  name="otpMethod"
                  value="phone"
                  checked={otpMethod === "phone"}
                  onChange={(e) => setOtpMethod(e.target.value)}
                />
                <span className="otp-method-label-forgot">
                  📱 Phone
                  <br />
                  <small>{foundUser?.phone}</small>
                </span>
              </label>
            </div>

            {error && <div className="error-message-forgot">{error}</div>}

            <button
              className="btn-primary-forgot"
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

            <button className="btn-secondary-forgot" onClick={() => setStep(1)}>
              Back
            </button>
          </div>
        )}

        {/* Step 3: Enter OTP */}
        {step === 3 && (
          <div className="modal-body-forgot">
            <h2 className="modal-title-forgot">Verify OTP</h2>
            <p className="modal-subtitle-forgot">
              Enter the OTP sent to your {otpMethod === "email" ? "email" : "phone"}
            </p>

            <input
              type="text"
              className="otp-input-forgot"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength="6"
            />

            {error && <div className="error-message-forgot">{error}</div>}

            <button className="btn-primary-forgot" onClick={handleVerifyOtp}>
              Verify OTP
            </button>

            <button className="btn-secondary-forgot" onClick={() => setStep(2)}>
              Back
            </button>
          </div>
        )}

        {/* Step 4: New Password */}
        {step === 4 && (
          <div className="modal-body-forgot">
            <h2 className="modal-title-forgot">Set New Password</h2>
            <p className="modal-subtitle-forgot">Enter your new password</p>

            <input
              type="password"
              className="password-input-forgot"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              className="password-input-forgot"
              placeholder="Re-enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {error && <div className="error-message-forgot">{error}</div>}

            <button className="btn-primary-forgot" onClick={handleSetPassword}>
              Reset Password
            </button>

            <button className="btn-secondary-forgot" onClick={() => setStep(3)}>
              Back
            </button>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="modal-body-forgot success-body-forgot">
            <div className="success-icon-forgot">✓</div>
            <h2 className="modal-title-forgot">Password Reset Successfully!</h2>
            <p className="modal-subtitle-forgot">
              Your password has been updated. You can now sign in with your new
              password.
            </p>

            <button className="btn-primary-forgot" onClick={handleClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
