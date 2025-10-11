import React, { useState } from "react";
import "./AccordionComponent.css";

const AccordionComponent = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionIndex) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionIndex]: !prevState[sectionIndex],
    }));
  };

  const sections = [
    {
      title: "FAQ",
      content: (
        <p>
          Here you can put your frequently asked questions and their answers.
          Example: “How long does shipping take?” – Usually 3–5 business days.
        </p>
      ),
    },
    {
      title: "Shipping",
      content: (
        <p>
          We offer free standard shipping on all orders above ₹999. Orders are
          processed within 24 hours and delivered within 3–7 business days.
        </p>
      ),
    },
  ];

  return (
    <div className="accordion-container">
      {sections.map((section, index) => (
        <div
          key={index}
          className={`accordion-section ${openSections[index] ? "open" : ""}`}
        >
          <div
            className="accordion-header"
            onClick={() => toggleSection(index)}
          >
            <span>{section.title}</span>
            <span
              className={`accordion-icon ${
                openSections[index] ? "expanded" : ""
              }`}
            >
              +
            </span>
          </div>

          {/* 🔹 Always render this div (no conditional rendering) */}
          <div
            className={`accordion-content ${
              openSections[index] ? "expanded" : ""
            }`}
          >
            {section.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AccordionComponent;
