import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saved, setSaved] = useState(false);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    // Load user's order count
    const userOrders = JSON.parse(localStorage.getItem(`user_orders_${user?.id}`) || "[]");
    setOrderCount(userOrders.length);
  }, [user?.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // In a real app, you'd save this to the backend
    // For now, just show a success message
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile__container">
      <div className="profile__header">
        <h1>My Profile</h1>
        <p>Welcome back, {user?.name}!</p>
      </div>

      <div className="profile__grid">
        {/* Profile Info Card */}
        <div className="profile__card">
          <h2>Account Information</h2>
          <form onSubmit={handleSaveProfile}>
            <div className="form__group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form__group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            {saved && <div className="profile__success">Profile updated successfully!</div>}

            <button type="submit" className="btn btn--primary profile__btn">
              Save Changes
            </button>
          </form>
        </div>

        {/* Quick Stats Card */}
        <div className="profile__card profile__stats">
          <h2>Quick Stats</h2>
          <div className="profile__stat">
            <span className="profile__stat-label">Total Orders</span>
            <span className="profile__stat-value">{orderCount}</span>
          </div>
          <div className="profile__stat">
            <span className="profile__stat-label">Member Since</span>
            <span className="profile__stat-value">2026</span>
          </div>
          <Link to="/order-history" className="btn btn--secondary profile__btn">
            View Order History
          </Link>
        </div>
      </div>

      {/* Actions Section */}
      <div className="profile__actions">
        <h2>Account Actions</h2>
        <div className="profile__action-grid">
          <button className="profile__action-btn">
            <span className="profile__action-icon">🔒</span>
            <span className="profile__action-label">Change Password</span>
          </button>
          <button className="profile__action-btn">
            <span className="profile__action-icon">📧</span>
            <span className="profile__action-label">Email Preferences</span>
          </button>
          <button className="profile__action-btn">
            <span className="profile__action-icon">🏠</span>
            <span className="profile__action-label">Manage Addresses</span>
          </button>
          <button className="profile__action-btn">
            <span className="profile__action-icon">💳</span>
            <span className="profile__action-label">Payment Methods</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="profile__footer">
        <button onClick={handleLogout} className="btn btn--logout">
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
