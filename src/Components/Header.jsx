import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import ProductBanner from "../assets/images/ProductBanner.png"

const Header = () => {
  return (
    <Navbar expand="lg" className="mm-navbar" sticky="top">
      <Container fluid className="px-3">
        <Navbar.Brand href="/">
          <img
            src={ProductBanner}
            alt="Metaman Perfumes"
            height="40"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Shop" id="shop-dd" menuVariant="dark">
              <NavDropdown.Item href="#">Shop All</NavDropdown.Item>
              <NavDropdown.Item href="#">Ha1o Alpha</NavDropdown.Item>
              <NavDropdown.Item href="#">Ha1o Date</NavDropdown.Item>
              <NavDropdown.Item href="#">Ha1o Day</NavDropdown.Item>
              <NavDropdown.Item href="#">Ha1o Sport</NavDropdown.Item>
              <NavDropdown.Item href="#">Ha1o Night</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">About Us</Nav.Link>
            <Nav.Link href="/pages/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" title="My Account">Account</Nav.Link>
            <Nav.Link href="#" title="Cart">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;