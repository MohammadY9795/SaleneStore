import React, { useEffect, useRef, useState } from "react";
import "./RightWayToApplyPerfume.css";

const RightWayToApplyPerfume = () => {
  const fadeSectionRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);

            // Delayed animations for images
            setTimeout(() => {
              if (image1Ref.current) image1Ref.current.classList.add("fade-in");
            }, 2000);

            setTimeout(() => {
              if (image2Ref.current) image2Ref.current.classList.add("fade-in");
            }, 4000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (fadeSectionRef.current) observer.observe(fadeSectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={fadeSectionRef}
      className={`background-section ${visible ? "fade-in" : ""}`}
    >
      <div className="overlay-images">
        <h2 className="caption-text">RIGHT WAY TO<br />APPLY PERFUME</h2>
        <img
          ref={image1Ref}
          src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/behind_the_ear.png?v=1724763887"
          alt="Behind the Ear"
          className="slide-in-left"
        />
        <img
          ref={image2Ref}
          src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/iner_wrrist.png?v=1724763887"
          alt="Inner Wrist"
          className="slide-in-right"
        />
      </div>
    </section>
  );
};

export default RightWayToApplyPerfume;
