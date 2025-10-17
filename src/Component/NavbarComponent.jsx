// Updated File: src/Component/NavbarComponent.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsBag, BsPerson } from 'react-icons/bs';
import './CommonStyle.css';
import Icon from '../assets/images/SALENE_LOGO.png';

const NavbarComponent = ({ toggleDarkMode, darkMode }) => {
  return (
    <header className="custom-navbar bg-dark text-white py-1 px-2">
      <Container fluid>
        <Row className="align-items-center text-center">
          {/* Left Menu */}
          <Col md={4} className="d-flex justify-content-start ps-4 gap-4 align-items-center">
            <Link to="/" className="nav-link-custom">HOME</Link>

            {/* Shop Dropdown */}
            <div className="nav-item dropdown">
              <span className="nav-link-custom dropdown-toggle" id="shopDropdown">
                SHOP
              </span>
              <div className="dropdown-menu custom-dropdown" aria-labelledby="shopDropdown">
                <Link to="/shop" className="dropdown-item">SHOP ALL</Link>
                <Link to="/product/haio-alpha" className="dropdown-item">HAIO ALPHA</Link>
                <Link to="/product/haio-date" className="dropdown-item">HAIO DATE</Link>
                <Link to="/product/haio-day" className="dropdown-item">HAIO DAY</Link>
                <Link to="/product/haio-sport" className="dropdown-item">HAIO SPORT</Link>
                <Link to="/product/haio-night" className="dropdown-item">HAIO NIGHT</Link>
              </div>
            </div>

            <Link to="/about" className="nav-link-custom">ABOUT US</Link>
            <Link to="/contact" className="nav-link-custom">CONTACT US</Link>
          </Col>

          {/* Center Logo */}
          <Col md={4} className="text-center">
            <img src={Icon} alt="Logo" style={{ height: '60px', width: '65px' }} />
            <div className="logo-text">SALENE</div>
          </Col>

          {/* Right Icons (Cart + Profile) */}
          <Col md={4} className="d-flex justify-content-end align-items-center pe-4 gap-4">
            <Link to="/cart" className="cart-icon text-white">
              <BsBag size={24} />
            </Link>

            <Link to="/login" className="profile-icon text-white">
              <BsPerson size={24} />
            </Link>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default NavbarComponent;