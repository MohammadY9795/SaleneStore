import { Container, Row, Col, Card, Dropdown, Form } from "react-bootstrap";
import React, { useState } from "react";
import "../styles/AllProducts.css";
import { Funnel } from "react-bootstrap-icons";

const mockProducts = [
  {
    id: 1,
    title: "Ha1o Alpha",
    image:
      "https://metaman.in/cdn/shop/files/4_ab6dd5ea-6af8-422e-9e82-04b29e944609.png?v=1758198583&width=480",
    newPrice: 349,
    oldPrice: 549,
    createdAt: "2023-08-01",
  },
  {
    id: 2,
    title: "Ha1o Date",
    image:
      "https://metaman.in/cdn/shop/files/SHR_0025_1.jpg?v=1758287615&width=480",
    newPrice: 349,
    oldPrice: 549,
    createdAt: "2023-08-10",
  },
  {
    id: 3,
    title: "Ha1o Day",
    image:
      "https://metaman.in/cdn/shop/files/PRA_0538_0920a365-e3bd-47da-87dd-089ebfabd5fd.jpg?v=1724823008&width=480",
    newPrice: 349,
    oldPrice: 549,
    createdAt: "2023-09-05",
  },
  {
    id: 4,
    title: "Ha1o Night",
    image:
      "https://metaman.in/cdn/shop/files/PRA_0318.jpg?v=1724823222&width=480",
    newPrice: 299,
    oldPrice: 549,
    createdAt: "2023-10-15",
  },
];

const AllProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [sortLabel, setSortLabel] = useState("Featured");

  const handleSort = (option) => {
    let sorted = [...products];
    switch (option) {
      case "title-ascending":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        setSortLabel("Alphabetically, A-Z");
        break;
      case "title-descending":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        setSortLabel("Alphabetically, Z-A");
        break;
      case "price-ascending":
        sorted.sort((a, b) => a.newPrice - b.newPrice);
        setSortLabel("Price, Low to High");
        break;
      case "price-descending":
        sorted.sort((a, b) => b.newPrice - a.newPrice);
        setSortLabel("Price, High to Low");
        break;
      case "created-ascending":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setSortLabel("Date, Old to New");
        break;
      case "created-descending":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setSortLabel("Date, New to Old");
        break;
      default:
        sorted = [...mockProducts];
        setSortLabel("Featured");
    }
    setProducts(sorted);
  };

  return (
    <main>
      {/* Banner */}
      <section className="mb-4">
        <Container fluid className="p-0">
          <img
            src="https://metaman.in/cdn/shop/files/Product_banner__2.jpg?v=1741590329&width=1080"
            alt="Products Banner"
            className="img-fluid w-100"
          />
        </Container>
      </section>

      {/* Filters + Sort row */}
      <Container fluid className="mb-3">
        <Row className="align-items-center">
          {/* Filter Dropdown (left) */}
          <Col className="d-flex justify-content-start">
            <Dropdown>
              <Dropdown.Toggle className="custom-filter-btn">
  <Funnel size={14} /> Show Filters
</Dropdown.Toggle>
              <Dropdown.Menu className="custom-filter-menu p-3">
                <h6 className="mb-2">Availability</h6>
                <Form.Check type="checkbox" id="in-stock" label="In Stock (3)" />
                <Form.Check
                  type="checkbox"
                  id="out-stock"
                  label="Out of Stock (1)"
                />
                <hr />
                <h6 className="mb-2">Price</h6>
                <div className="d-flex align-items-center gap-2">
                  <Form.Control type="number" placeholder="Min" className="filter-input" />
                  <span>–</span>
                  <Form.Control type="number" placeholder="Max" className="filter-input" />
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          {/* Sort Dropdown (right) */}
          <Col className="d-flex justify-content-end">
            <div className="d-flex align-items-center sort-container">
              <span className="me-2">Sort By</span>
              <Dropdown>
                 <Dropdown.Toggle className="custom-sort-btn">
      {sortLabel}
    </Dropdown.Toggle>
                <Dropdown.Menu className="custom-sort-menu">
                  <Dropdown.Item onClick={() => handleSort("manual")}>
                    Featured
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("best-selling")}>
                    Best Selling
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("title-ascending")}>
                    Alphabetically, A-Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("title-descending")}>
                    Alphabetically, Z-A
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("price-ascending")}>
                    Price, Low to High
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("price-descending")}>
                    Price, High to Low
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("created-ascending")}>
                    Date, Old to New
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleSort("created-descending")}>
                    Date, New to Old
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Products Grid */}
      <Container fluid>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>
                    <span className="text-danger fw-bold">
                      ₹{product.newPrice}
                    </span>{" "}
                    <span className="text-muted text-decoration-line-through ms-2">
                      ₹{product.oldPrice}
                    </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default AllProductsPage;
