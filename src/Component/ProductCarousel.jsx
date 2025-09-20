import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./CommonStyle.css";
import prdct1 from "../assets/images/prdct1.png";
import prdct2 from "../assets/images/prdct2.png";
import prdct3 from "../assets/images/prdct3.png";
import prdct4 from "../assets/images/prdct4.png";

const ProductCarousel = () => {
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
        {/* Product 1 */}
        <div className="item prev">
          <a href="#" className="product-link">
            <img
              src={prdct1}
              alt="Ha1o Alpha"
            />
            <img
              src={prdct1}
              alt="Ha1o Alpha - Hover"
              className="hover-img"
            />
          </a>
          <div className="details">
            <h2>Ha1o Alpha</h2>
            <p>
              For the man who commands the room.<br /> <b>Own it, Rule All</b>
            </p>
            <a href="#" className="btn btn-light">
              BUY NOW
            </a>
          </div>
        </div>

        {/* Product 2 */}
        <div className="item active">
          <a href="#" className="product-link">
            <img src={prdct2} />
            <img
              src={prdct2}
              alt="Ha1o Date - Hover"
              className="hover-img"
            />
          </a>
          <div className="details">
            <h2>Ha1o Date</h2>
            <p>
              A scent that turns heads and wins hearts.<br />{" "}
              <b>Set Vibes, Make Magic</b>
            </p>
            <a href="#" className="btn btn-light">
              BUY NOW
            </a>
          </div>
        </div>

        {/* Product 3 */}
        <div className="item next">
          <a href="#" className="product-link">
            <img src={prdct3} />
            <img
              src={prdct3}
              alt="Ha1o Day - Hover"
              className="hover-img"
            />
          </a>
          <div className="details">
            <h2>Ha1o Day</h2>
            <p>
              Your daily dose of confidence.<br /> <b>Fresh Start, All Day</b>
            </p>
            <a href="#" className="btn btn-light">
              BUY NOW
            </a>
          </div>
        </div>

        {/* Product 4 */}
        <div className="item">
          <a href="#" className="product-link">
            <img src={prdct4} />
            <img
              src={prdct4}
              alt="Ha1o Night - Hover"
              className="hover-img"
            />
          </a>
          <div className="details">
            <h2>Ha1o Night</h2>
            <p>
              Capture the night, own the spotlight.<br />{" "}
              <b>Dark, Bold, Unstoppable</b>
            </p>
            <a href="#" className="btn btn-light">
              BUY NOW
            </a>
          </div>
        </div>

        {/* Product 5 */}
        <div className="item">
          <a href="#" className="product-link">
            <img src={prdct1} />
            <img
              src={prdct1}
              alt="Ha1o Sport - Hover"
              className="hover-img"
            />
          </a>
          <div className="details">
            <h2>Ha1o Sport</h2>
            <p>
              Stay fresh through every challenge.<br /> <b>Play Hard, Stay Fresh</b>
            </p>
            <a href="#" className="btn btn-light">
              BUY NOW
            </a>
          </div>
        </div>

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
        <a href="#" className="btn btn-dark">
          VIEW ALL
        </a>
      </div>
    </section>
  );
};

export default ProductCarousel;
