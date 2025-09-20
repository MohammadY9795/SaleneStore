import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CommonStyle.css";
import logo from "../assets/images/SALENE_LOGO.png";

const Footer = () => {
  return (
    <footer className="footer-section text-white py-2">
      <div className="container">
        <div className="row align-items-start justify-content-between">
          
          {/* Logo */}
          <div className=" mb-4 mb-md-0">
            <a href="/" aria-label="Footer Logo">
              <img src={logo} alt="Brand Logo" className="footer-logo mb-3" />
            </a>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4 mb-md-0" style={{ marginLeft: '15px' }}>
            <h6 className="footer-title">QUICK LINKS</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/pages/about-us">About Us</a></li>
              <li><a href="/pages/faq">FAQs</a></li>
              <li><a href="/collections/all">Shop All</a></li>
              <li><a href="/pages/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Legal Info */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h6 className="footer-title">LEGAL INFORMATION</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="/policies/privacy-policy">Privacy Policy</a></li>
              <li><a href="/pages/cancellation-policy">Cancellation Policy</a></li>
              <li><a href="/policies/refund-policy">Refund Policy</a></li>
              <li><a href="/policies/shipping-policy">Shipping Policy</a></li>
              <li><a href="/policies/terms-of-service">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-md-4">
            <h6 className="footer-title">NEWSLETTER</h6>
            <p className="footer-text">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="d-flex newsletter-form">
              <input
                type="email"
                className="form-control me-2 newsletter-input"
                placeholder="Email"
                aria-label="Email"
                required
              />
              <button className="btn btn-warning newsletter-btn" type="submit">
                Join
              </button>
            </form>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
