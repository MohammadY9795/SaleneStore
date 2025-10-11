// src/pages/ProductPage.jsx

import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Carousel, Card } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { productsData } from "../../data/ProductsData";
import "./ProductPage.css";
import PaginationComponent from "../../Components/PaginationComponent";
import AccordionComponent from "../../Components/AccordionComponent";
import ImageStrip from "../../Components/ImageStrip";
import RelatedProducts from "../../Components/RelatedProducts";
import ConcentrationCounters from "../../Components/ConcentrationCounters";
import RightWayToApplyPerfume from "../../Components/RightWayToApplyPerfume";

export default function ProductPage() {
  const { slug } = useParams();
  const product = productsData[slug];

  const [activeImage, setActiveImage] = useState(product?.images[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product?.sizes[0] || "");
  const [activeTab, setActiveTab] = useState(null);
  const [currentReviewPage, setCurrentReviewPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(product.reviews.length / reviewsPerPage);
  const currentReviews = product.reviews.slice(
    (currentReviewPage - 1) * reviewsPerPage,
    currentReviewPage * reviewsPerPage
  );

  console.log("Total Pages:", totalPages);



  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found 😕</h2>
      </Container>
    );
  }

  console.log("Reviews:", product.reviews);

  return (
    <main className="py-5">
      {console.log("Helmet rendering for:", product.name)}
      <Helmet>
        <title>{`${product.name} | Metaman Perfumes`}</title>
        <meta
          name="description"
          content={`Buy ${product.name} at an exclusive price of Rs. ${product.price.toFixed(
            2
          )}. Discover long-lasting, premium fragrances from Metaman.`}
        />
        <meta property="og:title" content={`${product.name} | Metaman Perfumes`} />
        <meta
          property="og:description"
          content={`Explore ${product.name} – ${product.description?.slice(
            0,
            150
          ) || "A captivating fragrance for every mood."}`}
        />
        <meta property="og:image" content={product.images?.[0]} />
        <meta property="og:type" content="product" />
      </Helmet>
      {/* ✅ PAGE CONTENT (aligned centrally till Reviews) */}
      <div className="product-page-container">
        {/* 🖼 PRODUCT TOP SECTION */}
        <Container>
          <Row>
            {/* LEFT: Gallery */}
            <Col md={6} className="mb-4 mb-md-0">
              {/* Desktop Image Gallery with Hover Arrows */}
              <div className="d-none d-md-block position-relative">
                <div
                  className="mb-3 text-center position-relative image-container"
                  style={{
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  {/* Slide Wrapper */}
                  <div
                    className="slide-wrapper"
                    style={{
                      display: "flex",
                      transition: "transform 0.6s ease",
                      transform: `translateX(-${product.images.indexOf(activeImage) * 100}%)`,
                    }}
                  >
                    {product.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`product-${idx}`}
                        className="img-fluid border"
                        style={{
                          minWidth: "100%",
                          maxHeight: "600px",
                          objectFit: "contain",
                          userSelect: "none",
                        }}
                      />
                    ))}
                  </div>

                  {/* Left Arrow */}
                  <button
                    className="image-arrow left-arrow"
                    onClick={() => {
                      const currentIndex = product.images.indexOf(activeImage);
                      const prevIndex =
                        (currentIndex - 1 + product.images.length) % product.images.length;
                      setActiveImage(product.images[prevIndex]);
                    }}
                  >
                    <i className="bi bi-chevron-left"></i>
                  </button>

                  {/* Right Arrow */}
                  <button
                    className="image-arrow right-arrow"
                    onClick={() => {
                      const currentIndex = product.images.indexOf(activeImage);
                      const nextIndex = (currentIndex + 1) % product.images.length;
                      setActiveImage(product.images[nextIndex]);
                    }}
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">
                  {product.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumb-${idx}`}
                      className={`img-thumbnail ${activeImage === img ? "border-primary" : ""
                        }`}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => setActiveImage(img)}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Carousel */}
              <div className="d-block d-md-none">
                <Carousel interval={null}>
                  {product.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={img}
                        alt={`slide-${idx}`}
                        className="d-block w-100"
                        style={{ maxHeight: "400px", objectFit: "contain" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>

            {/* RIGHT: Info */}
            <Col md={6}>
              <h1 className="mb-3" style={{ color: "white" }}>{product.name}</h1>

              {/* Price */}
              <div className="mb-3">
                <span className="fs-3 fw-bold text-danger me-2">
                  Rs. {product.price.toFixed(2)}
                </span>
                <s className="text-light" style={{ color: "white" }}>
                  Rs. {product.comparePrice.toFixed(2)}
                </s>
                <span className="ms-2 badge bg-success">{product.discount}% OFF</span>
              </div>

              {/* Reviews */}
              <div className="d-flex align-items-center mb-4">
                <span style={{ color: "#E7721B", fontSize: "1.2rem" }}>
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 ? "½" : ""}
                </span>
                <span className="ms-2 text-light" style={{ color: "white" }}>
                  ({product.reviews.length} Reviews)
                </span>
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <Form.Group className="mb-3 text-light">
                  <Form.Label>Size</Form.Label>
                  <Form.Select value={size} onChange={(e) => setSize(e.target.value)}>
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}

              {/* Quantity */}
              <Form.Group className="mb-3 text-light">
                <Form.Label>Quantity</Form.Label>
                <Form.Select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="dark" size="lg">
                  Add to Cart
                </Button>

              </div>
              <div>
                {/* 🧾 PRODUCT DETAILS TABS */}
                <section className="mt-5 border-bottom" style={{ color: "white" }}>
                  <Tabs
                    defaultActiveKey="description"
                    id="product-tabs"
                    className="mb-3 product-tabs"
                    justify
                  >
                    {/* 🟢 Description */}
                    <Tab eventKey="description" title="Description">
                      <div className="rte">
                        <h3>About {product.name}</h3>
                        <p>
                          {product.description ||
                            `${product.name} by Metaman is the epitome of passion and allure. This captivating fragrance embodies the essence of romantic evenings and unforgettable moments, housed in an elegant glass bottle that exudes charm and sophistication.`}
                        </p>

                        <h3>Who is this Perfume For?</h3>
                        <p>
                          Designed for individuals who embrace romance, confidence, and excitement. Whether you're planning a special evening or seeking to make a lasting impression, this perfume ensures every moment is memorable.
                        </p>

                        <p>
                          <strong>Bottle Type:</strong> Glass<br />
                          <strong>Concentration:</strong> 30%
                        </p>

                        <img
                          src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/notes_sports_copy_3.png?v=1727866784"
                          alt="Perfume Notes"
                          className="img-fluid rounded my-3"
                        />
                      </div>
                    </Tab>

                    {/* 🟣 How to Use */}
                    <Tab eventKey="howtouse" title="How to Use?">
                      <div className="rte">
                        <p>Spray perfume on your pulse points:</p>
                        <ul>
                          <li>Apply it from a distance of 10–20 cm to your neck and shoulder area.</li>
                          <li>Avoid rubbing the perfume.</li>
                          <li>Spritz it, don’t mist.</li>
                        </ul>
                      </div>
                    </Tab>

                    {/* 🟡 Returns & Exchange */}
                    <Tab eventKey="returns" title="Returns & Exchange">
                      <div className="rte">
                        <p><strong>Returns:</strong></p>
                        <ul>
                          <li>No returns on opened or used items.</li>
                          <li>Damages from neglect or improper usage are not covered.</li>
                        </ul>

                        <p><strong>Refunds:</strong></p>
                        <ul>
                          <li>Not responsible for damage after delivery.</li>
                          <li>Unboxing video required for claims.</li>
                          <li>Contact customer care within 24 hours of delivery with images/videos.</li>
                          <li>Refunds exclude delivery charges.</li>
                          <li>COD refunds in 4–7 days; other refunds may take up to 15 days.</li>
                        </ul>

                        <p><strong>Exchanges:</strong></p>
                        <ul>
                          <li>Damaged products can be exchanged after verification.</li>
                        </ul>
                      </div>
                    </Tab>

                    {/* 🔵 Perfume Care Instruction */}
                    <Tab eventKey="care" title="Perfume Care Instruction">
                      <div className="rte">
                        <ol>
                          <li>Keep away from direct exposure to light.</li>
                          <li>Store in a cool & dry place.</li>
                        </ol>
                      </div>
                    </Tab>
                  </Tabs>
                </section>
              </div>
            </Col>
          </Row>
        </Container>

        {/* ⭐ CUSTOMER REVIEWS */}
        <section
          className="py-5 text-center"
          style={{ color: "white" }}
        >
          <Container>
            <h2 className="mb-4" style={{ fontSize: '20px' }}>Customer Reviews</h2>

            {/* Rating summary bar (Average rating + star counts) */}
            <div className="mb-4 pb-3 border-bottom d-flex align-items-center justify-content-center flex-wrap gap-4">
              {/* ⭐ Rating Summary */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
                  {product.rating.toFixed(1)} / 5.0
                  <span
                    style={{
                      marginLeft: "12px",
                      color: "#E7721B",
                      fontSize: "1.2rem",
                    }}
                  >
                    {"★".repeat(Math.floor(product.rating))}
                    {product.rating % 1 !== 0 ? "½" : ""}
                  </span>
                </div>

                <div className="mt-3 d-inline-block text-start">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="d-flex align-items-center mb-1">
                      <span
                        style={{ width: 24, color: "#E7721B", marginRight: "50px" }}
                      >
                        {"★".repeat(star)}
                      </span>
                      <div
                        className="progress flex-grow-1 mx-2"
                        style={{
                          width: 180,
                          height: "8px",
                          background: "#3a3a3a",
                        }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          style={{
                            width: `${(product.reviews.filter((r) => r.rating === star).length /
                              product.reviews.length) *
                              100 || 0
                              }%`,
                          }}
                        ></div>
                      </div>
                      <span style={{ minWidth: 28 }}>
                        {product.reviews.filter((r) => r.rating === star).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ✍️ Write Review Button */}
              <div className="d-flex align-items-center">
                <Button
                  variant="outline-dark"
                  size="sm"
                  style={{
                    color: "white",
                    borderColor: "white",
                    height: "fit-content",
                  }}
                >
                  Write a Review
                </Button>
              </div>
            </div>


            {/* Actual reviews */}
            {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
              currentReviews.map((r) => (
                <div
                  key={r.id}
                  className="mb-4 pb-3 border-bottom d-flex flex-column align-items-center"
                  style={{ color: "white" }}
                >
                  {/* Avatar + Name + Verified */}
                  <div className="mb-2 text-center">
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        background: "#8D99B6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.27rem",
                        margin: "0 auto",
                      }}
                    >
                      {r.name[0]}
                    </div>
                    <div style={{ fontSize: "0.9rem", marginTop: 6 }}>{r.name}</div>
                    {r.verified && (
                      <span
                        className="badge bg-success"
                        style={{ fontSize: "0.8rem", marginTop: 4 }}
                      >
                        Verified Buyer
                      </span>
                    )}
                  </div>

                  {/* Rating, title, content */}
                  <div className="text-center">
                    <div style={{ color: "#E7721B" }}>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </div>
                    {r.title && <strong>{r.title}</strong>}
                    <p className="mb-0">{r.text}</p>
                    <small className="text-muted d-block mt-1" style={{ color: "#ccc" }}>
                      {new Date(r.date).toLocaleDateString()}
                    </small>
                  </div>

                  {/* Helpful votes */}
                  <div
                    className="mt-2 text-center"
                    style={{ fontSize: "0.92rem", marginTop: 10 }}
                  >
                    <div style={{ marginBottom: 5 }}>Was this review helpful?</div>
                    <Button
                      variant="outline-success"
                      size="sm"
                      style={{ marginRight: 3 }}
                    >
                      👍
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      👎
                    </Button>
                    <span style={{ marginLeft: 8, fontSize: "0.89rem" }}>
                      {r.helpfulVotes || 0}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet for this product.</p>
            )}

            <div className="d-flex justify-content-center mt-4">
              {Array.isArray(product.reviews) && product.reviews.length > 0 && (
                <PaginationComponent
                  currentPage={currentReviewPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentReviewPage}
                  maxVisiblePages={5}
                />
              )}
            </div>

            <div>
              <AccordionComponent />
            </div>
          </Container>
        </section>
      </div>
      <ImageStrip />
      <RightWayToApplyPerfume />
      <ConcentrationCounters />
      <RelatedProducts currentSlug={slug} />
    </main>
  );
}
