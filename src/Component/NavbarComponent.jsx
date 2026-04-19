// ...existing code...
import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsBag, BsPerson } from 'react-icons/bs';
import './CommonStyle.css';
import Icon from '../assets/images/SALENE_LOGO.png';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const NavbarComponent = ({ toggleDarkMode, darkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [shopDropdownTimeout, setShopDropdownTimeout] = useState(null);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const totalItems = getTotalItems();
  const profileDropdownRef = useRef(null);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(v => !v);

  // Handle shop dropdown with delay to prevent flickering
  const handleShopDropdownEnter = () => {
    if (shopDropdownTimeout) {
      clearTimeout(shopDropdownTimeout);
      setShopDropdownTimeout(null);
    }
    setIsShopDropdownOpen(true);
  };

  const handleShopDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 150); // 150ms delay before closing
    setShopDropdownTimeout(timeout);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (shopDropdownTimeout) {
        clearTimeout(shopDropdownTimeout);
      }
    };
  }, [shopDropdownTimeout]);

  const handleLogout = () => {
    logout();
    closeSidebar();
    navigate("/login");
  };

  const handleProfileLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate("/login");
  };

  const NavLinks = ({ onClick }) => {
    const handleLinkClick = () => {
      onClick();
      setIsShopDropdownOpen(false);
    };

    return (
    <>
      <Link to="/" className="nav-link-custom" onClick={onClick}>HOME</Link>

      <div className="nav-item dropdown d-none d-md-inline-block" onMouseEnter={handleShopDropdownEnter} onMouseLeave={handleShopDropdownLeave}>
        <span className="nav-link-custom dropdown-toggle" id="shopDropdown">
          SHOP
        </span>
        <div className={`dropdown-menu custom-dropdown ${isShopDropdownOpen ? 'show' : ''}`} aria-labelledby="shopDropdown">
          <Link to="/shop" className="dropdown-item" onClick={handleLinkClick}>SHOP ALL</Link>
          <Link to="/product/haio-alpha" className="dropdown-item" onClick={handleLinkClick}>HAIO ALPHA</Link>
          <Link to="/product/haio-date" className="dropdown-item" onClick={handleLinkClick}>HAIO DATE</Link>
          <Link to="/product/haio-day" className="dropdown-item" onClick={handleLinkClick}>HAIO DAY</Link>
          <Link to="/product/haio-sport" className="dropdown-item" onClick={handleLinkClick}>HAIO SPORT</Link>
          <Link to="/product/haio-night" className="dropdown-item" onClick={handleLinkClick}>HAIO NIGHT</Link>
        </div>
      </div>

      {/* Mobile-only shop links will be rendered inside sidebar */}
      <Link to="/about" className="nav-link-custom d-none d-md-inline-block" onClick={onClick}>ABOUT US</Link>
      <Link to="/contact" className="nav-link-custom d-none d-md-inline-block" onClick={onClick}>CONTACT US</Link>
    </>
    );
  };

  return (
    <header className="custom-navbar bg-dark text-white py-1 px-2">
      <Container fluid>
        <Row className="align-items-center text-center gx-0">
          {/* Left: hamburger on mobile / links on md+ */}
          <Col xs={3} md={4} className="d-flex align-items-center ps-3">
            {/* Hamburger - visible on small screens only */}
            <button
              className="hamburger-btn d-md-none btn btn-link text-white p-0"
              aria-label="Open menu"
              onClick={toggleSidebar}
            >
              <span className="hamburger-icon" />
            </button>

            {/* Desktop links */}
            <div className="d-none d-md-flex align-items-center gap-4">
              <NavLinks onClick={closeSidebar} />
            </div>
          </Col>

          {/* Center Logo (always centered) */}
          <Col xs={6} md={4} className="text-center">
            <img src={Icon} alt="Logo" style={{ height: '60px', width: '65px' }} />
            <div className="logo-text">SALENE</div>
          </Col>

          {/* Right icons - cart/profile (profile hidden on mobile) */}
          <Col xs={3} md={4} className="d-flex justify-content-end align-items-center pe-3 gap-2">
            {user && (
              <Link to="/cart" className="cart-icon text-white navbar-icon-link position-relative">
                <BsBag size={20} />
                {totalItems > 0 && (
                  <span 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                    style={{ 
                      fontSize: '0.7rem', 
                      backgroundColor: '#d4af37', 
                      color: '#000', 
                      padding: '0.2em 0.4em',
                      minWidth: '1.2em',
                      height: '1.2em',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <div className="profile-dropdown-container" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="profile-icon text-white d-none d-md-inline-flex navbar-icon-button"
                  title="Profile"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt="avatar" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <BsPerson size={20} />
                  )}
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown-menu">
                    <div className="profile-dropdown-header">
                      <h3 className="profile-dropdown-name">{user.name}</h3>
                    </div>

                    <div className="profile-dropdown-content">
                      <div className="profile-info-item">
                        <span className="profile-info-label">Email Address</span>
                        <p className="profile-info-value">{user.email}</p>
                      </div>

                      <div className="profile-info-item">
                        <span className="profile-info-label">Phone Number</span>
                        <p className="profile-info-value">{user.phone}</p>
                      </div>
                    </div>

                    <div className="profile-dropdown-actions">
                      <Link
                        to="/profile"
                        className="btn-profile-details"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Additional Details
                      </Link>

                      <button
                        onClick={handleProfileLogout}
                        className="btn-profile-logout"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="profile-icon text-white d-none d-md-inline-flex">
                <BsPerson size={24} />
              </Link>
            )}
          </Col>
        </Row>
      </Container>

      {/* Mobile sidebar */}
      <div className={`mobile-backdrop ${sidebarOpen ? 'open' : ''}`} onClick={closeSidebar} />

      <nav className={`mobile-sidebar ${sidebarOpen ? 'open' : ''}`} aria-hidden={!sidebarOpen}>
        <div className="sidebar-header d-flex justify-content-between align-items-center px-3 py-2">
          <img src={Icon} alt="Logo" style={{ height: '40px', width: '44px' }} />
          <button className="btn btn-link text-white p-0" onClick={closeSidebar} aria-label="Close menu">
            ✕
          </button>
        </div>

        <div className="sidebar-links px-3">
          <Link to="/" className="sidebar-link" onClick={closeSidebar}>HOME</Link>

          <div className="sidebar-section">
            <div className="sidebar-title">SHOP</div>
            <Link to="/shop" className="sidebar-link" onClick={closeSidebar}>SHOP ALL</Link>
            <Link to="/product/haio-alpha" className="sidebar-link" onClick={closeSidebar}>HAIO ALPHA</Link>
            <Link to="/product/haio-date" className="sidebar-link" onClick={closeSidebar}>HAIO DATE</Link>
            <Link to="/product/haio-day" className="sidebar-link" onClick={closeSidebar}>HAIO DAY</Link>
            {/* <Link to="/product/haio-sport" className="sidebar-link" onClick={closeSidebar}>HAIO SPORT</Link>
            <Link to="/product/haio-night" className="sidebar-link" onClick={closeSidebar}>HAIO NIGHT</Link> */}
          </div>

          <Link to="/about" className="sidebar-link" onClick={closeSidebar}>ABOUT US</Link>
          <Link to="/contact" className="sidebar-link" onClick={closeSidebar}>CONTACT US</Link>

          {/* Profile moved into mobile sidebar */}
          <div className="sidebar-section mt-2">
            <div className="sidebar-title">ACCOUNT</div>
            {user ? (
              <>
                <div className="sidebar-link" style={{ color: '#d4af37', fontWeight: 'bold' }}>
                  {user.name}
                </div>
                <Link to="/profile" className="sidebar-link" onClick={closeSidebar} style={{ color: '#d4af37' }}>
                  My Profile
                </Link>
                <Link to="/order-history" className="sidebar-link" onClick={closeSidebar} style={{ color: '#d4af37' }}>
                  Order History
                </Link>
                <button
                  onClick={handleLogout}
                  className="sidebar-link btn btn-link text-start w-100"
                  style={{ textDecoration: 'none', padding: 0, color: '#d4af37' }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="sidebar-link" onClick={closeSidebar}>
                <BsPerson style={{ marginRight: 8 }} /> Login / Profile
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
// ...existing code...