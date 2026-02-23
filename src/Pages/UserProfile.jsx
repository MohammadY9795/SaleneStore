import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ChangePasswordModal from "../Component/ChangePasswordModal";
import ManageAddressesModal from "../Component/ManageAddressesModal";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, logout, updateUser, updatePassword, addAddress } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saved, setSaved] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isManageAddressesOpen, setIsManageAddressesOpen] = useState(false);

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

  const handlePasswordChange = async (newPassword) => {
    try {
      await updatePassword(newPassword);
      setIsChangePasswordOpen(false);
    } catch (err) {
      console.error("Failed to change password:", err);
    }
  };

  const handleAddAddress = (addressData) => {
    try {
      addAddress(addressData);
      // Toast or success message could be added here
    } catch (err) {
      console.error("Failed to add address:", err);
    }
  };

  const firstName = user?.name ? user.name.split(' ')[0] : '';

  return (
    <div className="profile__container">
      <div className="profile__header">
        <div className="profile__avatar">
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (!file) return;
              if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file.');
                return;
              }
              const reader = new FileReader();
              reader.onload = (ev) => {
                const dataUrl = ev.target.result;
                updateUser({ avatar: dataUrl });
              };
              reader.readAsDataURL(file);
            }}
          />

          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="avatar-image" />
          ) : (
            <div className="avatar-placeholder">{(user?.name || 'U').charAt(0).toUpperCase()}</div>
          )}

          <button
            type="button"
            className="avatar-edit-btn"
            onClick={() => document.getElementById('avatarInput').click()}
            aria-label="Edit profile picture"
          >
            ✎
          </button>
        </div>

        <h1 style={{ marginTop: '12px' }}>My Profile</h1>
        <p>Welcome back, {firstName}!</p>
      </div>

      <div className="profile__grid">
        {/* Profile Info Card */}
        <div className="profile__card">
          <h2>Account Information</h2>
          <div>
            <div className="form__group">
              <label>Full Name</label>
              <div className="static-value">{user?.name}</div>
            </div>

            <div className="form__group">
              <label>Email Address</label>
              <div className="static-value">{user?.email}</div>
            </div>

            <div className="form__group">
              <label>Phone Number</label>
              <div className="static-value">{user?.phone}</div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="profile__card profile__stats">
          <h2>Quick Stats</h2>
          <div className="stats-body">
            <div className="profile__stat">
              <span className="profile__stat-label">Total Orders</span>
              <span className="profile__stat-value">{orderCount}</span>
            </div>
            <div className="profile__stat">
              <span className="profile__stat-label">Member Since</span>
              <span className="profile__stat-value">2026</span>
            </div>
          </div>

          <div className="stats-footer">
            {orderCount >= 1 ? (
              <Link to="/order-history" className="btn btn--secondary profile__btn">
                View Order History
              </Link>
            ) : (
              <button className="btn btn--secondary profile__btn" disabled title="You need at least 1 order to view order history">
                View Order History
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="profile__actions">
        <h2>Account Actions</h2>
        <div className="profile__action-grid">
          <button 
            className="profile__action-btn"
            onClick={() => setIsChangePasswordOpen(true)}
          >
            <span className="profile__action-icon">🔒</span>
            <span className="profile__action-label">Change Password</span>
          </button>
          <button className="profile__action-btn">
            <span className="profile__action-icon">📧</span>
            <span className="profile__action-label">Email Preferences</span>
          </button>
          <button 
            className="profile__action-btn"
            onClick={() => setIsManageAddressesOpen(true)}
          >
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        user={user}
        onPasswordChange={handlePasswordChange}
      />

      {/* Manage Addresses Modal */}
      <ManageAddressesModal
        isOpen={isManageAddressesOpen}
        onClose={() => setIsManageAddressesOpen(false)}
        user={user}
        onAddAddress={handleAddAddress}
      />
    </div>
  );
};

export default UserProfile;
