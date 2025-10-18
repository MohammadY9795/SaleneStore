// ...existing code...
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBag, BsPerson } from 'react-icons/bs';
import './CommonStyle.css';
import Icon from '../assets/images/SALENE_LOGO.png';

const NavbarComponent = ({ toggleDarkMode, darkMode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebar = () => setSidebarOpen(v => !v);

  const NavLinks = ({ onClick }) => (
    <>
      <Link to="/" className="nav-link-custom" onClick={onClick}>HOME</Link>

      <div className="nav-item dropdown d-none d-md-inline-block">
        <span className="nav-link-custom dropdown-toggle" id="shopDropdown">
          SHOP
        </span>
        <div className="dropdown-menu custom-dropdown" aria-labelledby="shopDropdown">
          <Link to="/shop" className="dropdown-item" onClick={onClick}>SHOP ALL</Link>
          <Link to="/product/haio-alpha" className="dropdown-item" onClick={onClick}>HAIO ALPHA</Link>
          <Link to="/product/haio-date" className="dropdown-item" onClick={onClick}>HAIO DATE</Link>
          <Link to="/product/haio-day" className="dropdown-item" onClick={onClick}>HAIO DAY</Link>
          <Link to="/product/haio-sport" className="dropdown-item" onClick={onClick}>HAIO SPORT</Link>
          <Link to="/product/haio-night" className="dropdown-item" onClick={onClick}>HAIO NIGHT</Link>
        </div>
      </div>

      {/* Mobile-only shop links will be rendered inside sidebar */}
      <Link to="/about" className="nav-link-custom d-none d-md-inline-block" onClick={onClick}>ABOUT US</Link>
      <Link to="/contact" className="nav-link-custom d-none d-md-inline-block" onClick={onClick}>CONTACT US</Link>
    </>
  );

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
              <NavLinks />
            </div>
          </Col>

          {/* Center Logo (always centered) */}
          <Col xs={6} md={4} className="text-center">
            <img src={Icon} alt="Logo" style={{ height: '60px', width: '65px' }} />
            <div className="logo-text">SALENE</div>
          </Col>

          {/* Right icons - cart/profile (profile hidden on mobile) */}
          <Col xs={3} md={4} className="d-flex justify-content-end align-items-center pe-3">
            <Link to="/cart" className="cart-icon text-white me-3">
              <BsBag size={24} />
            </Link>

            {/* profile icon hidden on small screens, moved into sidebar */}
            <Link to="/login" className="profile-icon text-white d-none d-md-inline-flex">
              <BsPerson size={24} />
            </Link>
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
            <Link to="/login" className="sidebar-link" onClick={closeSidebar}>
              <BsPerson style={{ marginRight: 8 }} /> Login / Profile
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarComponent;
// ...existing code...