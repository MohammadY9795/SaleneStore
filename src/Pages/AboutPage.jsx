// File: src/Pages/AboutPage.jsx
import React, { useState, useEffect, useRef } from "react";
import "./AboutPage.css"; // create this CSS file to move styles from outerHTML

const AboutPage = () => {
  // Carousel state
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef(null);

  const carouselItems = [
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_16.png?v=1724918291",
      link: "https://mediabrief.com/kl-rahul-becomes-brand-ambassador-and-investor-in-drip-projects-metaman/",
      alt: "media brief",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_15.png?v=1724918410",
      link: "https://haveafeed.com/2024/08/26/d2c-brand-metaman-bags-additional-funding-from-kl-rahul-to-launch-perfume-range/",
      alt: "HAF",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_14.png?v=1724918519",
      link: "https://brandzmagazine.com/exclusive-d2c-brand-metaman-bags-funding-from-kl-rahul-to-launch-perfume-range/",
      alt: "BRANDZ MAGAZINE",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/default.png?v=1724918590",
      link: "https://www.instagram.com/p/C_Kb57RqKs3/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      alt: "INC42",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/logo-bg-01.png?v=1724918648",
      link: "https://www.business-standard.com/amp/companies/news/kl-rahul-invests-in-lifestyle-brand-metaman-for-new-premium-perfume-range-124082700391_1.html",
      alt: "Business Standard",
    },
    // duplicate logos for continuous effect
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_18.png?v=1724918710",
      link: "https://www.adgully.com/kl-rahul-joins-drip-project-s-metaman-as-brand-ambassador-and-investor-149635.html",
      alt: "AD GULLY",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/headerV3_YS-01.png?v=1724918785",
      link: "https://yourstory.com/2024/08/startup-news-and-updates-daily-roundup-august-26-2024",
      alt: "YOUR STORY",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_13.png?v=1724918870",
      link: "https://orissadiary.com/kl-rahul-becomes-brand-ambassador-and-investor-in-drip-projects-premium-fragrance-brand-metaman/",
      alt: "Orris Diary",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/retail-logo-header-01.png?v=1724918958",
      link: "https://retail.economictimes.indiatimes.com/news/health-and-beauty/cosmetics-and-fragrances/kl-rahul-invests-in-drip-projects-perfume-brand-metaman/112823284",
      alt: "Economic Times",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/Asset_19.png?v=1724919014",
      link: "https://www.bollywoodhungama.com/news/features/kl-rahul-becomes-brand-ambassador-investor-drip-projects-premium-fragrance-brand-metaman/",
      alt: "Bollywood Hungama",
    },
  ];

  // Carousel handlers
  const showNext = () => setIndex((prev) => (prev + 1) % carouselItems.length);
  const showPrev = () =>
    setIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);

  useEffect(() => {
    const interval = setInterval(showNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="main-content">
      {/* Section: About Us */}
      <section className="section-padding about-section">
        <div className="wrapper text-left">
          <h2 className="section-title">About Us</h2>
          <p>
            Metaman is a fragrance brand founded by KL Rahul and Drip Project
            committed to crafting unforgettable scents that embody elegance,
            sophistication, and individuality. Metaman marks an exciting expansion
            into the world of high-end perfumes.
          </p>
          <p>
            At Metaman, we believe that a fragrance is more than just a scent; it's
            an experience, a statement, and a reflection of one's personality. Our
            collection features meticulously crafted perfumes designed for every
            occasion, ensuring you always have the perfect scent to complement your
            style.
          </p>
        </div>
      </section>

      {/* Section: Our Story */}
      <section className="section-padding story-section">
        <div className="wrapper text-left">
          <h2 className="section-title">Our Story</h2>
          <p>
            Metaman was born from a passion for excellence and a desire to bring
            the finest fragrances to life. Our journey began with the vision to
            create a brand that offers not just perfumes, but an olfactory
            experience that captivates and inspires. Drawing on the rich heritage
            and expertise of Drip Project, we have seamlessly blended artistry
            with craftsmanship to develop a line of perfumes that are both
            timeless and contemporary.
          </p>
        </div>
      </section>

      {/* Section: Our Commitment */}
      <section className="section-padding commitment-section">
        <div className="wrapper text-left">
          <h2 className="section-title">Our Commitment</h2>
          <p>
            At Metaman, we are dedicated to quality and sustainability. Our perfumes
            are crafted using the finest ingredients, ensuring a long-lasting and
            memorable scent.
          </p>
        </div>
      </section>

      {/* Section: Brand Ambassador */}
      <section className="section-padding ambassador-section">
        <div className="wrapper dual-block">
          <div className="image-block">
            <img
              src="https://metaman.in/cdn/shop/files/KL_About_80272388-1aef-4687-ba30-1eb3260d61cd.png?v=1724822799"
              alt="KL Rahul"
            />
          </div>
          <div className="text-block">
            <h2 className="section-title">Meet Our Brand Ambassador</h2>
            <p>
              We are proud to have renowned cricketer KL Rahul as our brand ambassador
              and investor. His dedication, passion, and excellence on and off the
              field perfectly align with the values of Metaman.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Join Our Journey */}
      <section className="section-padding journey-section">
        <div className="wrapper dual-block reverse">
          <div className="image-block">
            <img
              src="https://metaman.in/cdn/shop/files/Halo_KL_4947_copyext_copy_1.jpg?v=1724181405"
              alt="Metaman Journey"
            />
          </div>
          <div className="text-block">
            <h2 className="section-title">Join Us on Our Journey</h2>
            <p>
              Experience the magic of Metaman and let your scent tell your story.
              Explore our collection and find your perfect fragrance today. Whether
              you're looking to make a statement, create lasting memories, or simply
              indulge in a moment of luxury, Ha1o is here to elevate your everyday
              life.
            </p>
            <p>
              For more information or to shop our collection, visit{" "}
              <a
                href="https://metaman.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                metaman.in
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Section: Carousel */}
      <section className="carousel-container">
        <h4>Featured In</h4>
        <div
          className="carousel-wrapper"
          ref={wrapperRef}
          style={{
            transform: `translateX(-${index * 170}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {carouselItems.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="carousel-item"
            >
              <img src={item.img} alt={item.alt} />
            </a>
          ))}
        </div>
        <div className="carousel-navigation">
          <button className="nav-button" onClick={showPrev}>
            ❮
          </button>
          <button className="nav-button" onClick={showNext}>
            ❯
          </button>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
