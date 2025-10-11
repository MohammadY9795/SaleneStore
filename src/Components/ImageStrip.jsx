// src/components/ImageStrip.jsx
import React, { useEffect } from "react";
import "./ImageStrip.css";

export default function ImageStrip() {
  useEffect(() => {
    const imgs = document.querySelectorAll(".image-strip img");
    imgs.forEach((img, index) => {
      setTimeout(() => img.classList.add("visible"), index * 500);
    });
  }, []);

  return (
    <div className="image-strip">
      <img src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_9.png?v=1724776623" alt="Asset 9" />
      <img src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_7.png?v=1724776616" alt="Asset 7" />
      <img src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_6.png?v=1724776615" alt="Asset 6" />
      <img src="https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_8.png?v=1724776615" alt="Asset 8" />
    </div>
  );
}
