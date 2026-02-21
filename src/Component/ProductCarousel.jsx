import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./CommonStyle.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import prdct1 from "../assets/images/prdct1.png";
import prdct2 from "../assets/images/prdct2.png";
import prdct3 from "../assets/images/prdct3.png";
import prdct4 from "../assets/images/prdct4.png";

const ProductCarousel = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const carouselProducts = [
    {
      id: 1,
      name: "Ha1o Alpha",
      tagline: "For the man who commands the room. Own it, Rule All",
      image: prdct1,
      price: 99.99,
    },
    {
      id: 2,
      name: "Ha1o Date",
      tagline: "A scent that turns heads and wins hearts. Set Vibes, Make Magic",
      image: prdct2,
      price: 99.99,
    },
    {
      id: 3,
      name: "Ha1o Day",
      tagline: "Your daily dose of confidence. Fresh Start, All Day",
      image: prdct3,
      price: 99.99,
    },
    {
      id: 4,
      name: "Ha1o Night",
      tagline: "Capture the night, own the spotlight. Dark, Bold, Unstoppable",
      image: prdct4,
      price: 99.99,
    },
    {
      id: 5,
      name: "Ha1o Sport",
      tagline: "Stay fresh through every challenge. Play Hard, Stay Fresh",
      image: prdct1,
      price: 99.99,
    },
  ];

  const handleBuyNow = (product) => {
    addToCart(product, 1);
    navigate("/checkout");
  };
  useEffect(() => {
    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");

    let current = 0;
    let prev = slides.length - 1;
    let next = 1;
    let startX = 0;
    let isDragging = false;

    for (let i = 0; i < button.length; i++) {
      button[i].addEventListener("click", () =>
        i === 0 ? gotoPrev() : gotoNext()
      );
    }

    // Mouse and touch events
    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag);

    slider.addEventListener("mousemove", drag);
    slider.addEventListener("touchmove", drag);

    slider.addEventListener("mouseup", endDrag);
    slider.addEventListener("touchend", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    function startDrag(e) {
      startX = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      isDragging = true;
    }

    function drag(e) {
      if (!isDragging) return;
      const x = e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
      const walk = x - startX;

      if (walk > 50) {
        gotoPrev();
        isDragging = false;
      } else if (walk < -50) {
        gotoNext();
        isDragging = false;
      }
    }

    function endDrag() {
      isDragging = false;
    }

    const gotoPrev = () =>
      current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);
    const gotoNext = () =>
      current < slides.length - 1 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = (number) => {
      current = number;
      prev = current - 1;
      next = current + 1;

      for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active", "prev", "next");
      }

      if (next === slides.length) next = 0;
      if (prev === -1) prev = slides.length - 1;

      slides[current].classList.add("active");
      slides[prev].classList.add("prev");
      slides[next].classList.add("next");
    };
  }, []);

  return (
    <section className="custom-carousel">
      <h2 className="text-center" style={{ fontSize: "20px", fontWeight: "700", marginTop: "30px", marginBottom: "-65px" }}>
        Ha1o Collection
      </h2>
      <div className="items">
        {carouselProducts.map((product, index) => (
          <div
            key={product.id}
            className={`item ${index === 0 ? "prev" : index === 1 ? "active" : index === 2 ? "next" : ""}`}
          >
            <a href="#products" className="product-link" onClick={(e) => e.preventDefault()}>
              <img src={product.image} alt={product.name} />
              <img src={product.image} alt={`${product.name} - Hover`} className="hover-img" />
            </a>
            <div className="details">
              <h2>{product.name}</h2>
              <p>{product.tagline}</p>
              <button
                onClick={() => handleBuyNow(product)}
                className="btn btn-light"
                style={{ cursor: "pointer" }}
              >
                BUY NOW
              </button>
            </div>
          </div>
        ))}

        {/* Arrows */}
        <div className="button-container">
          <div className="button">
            <i className="fas fa-angle-left"></i>
          </div>
          <div className="button">
            <i className="fas fa-angle-right"></i>
          </div>
        </div>
      </div>

      {/* Footer button */}
      <div className="text-center my-4" style={{ marginLeft: '2px' }}>
        <button
          onClick={() => navigate("/shop")}
          className="btn btn-dark"
          style={{ cursor: "pointer" }}
        >
          VIEW ALL
        </button>
      </div>
    </section>
  );
};

export default ProductCarousel;
