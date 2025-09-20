import React from "react";
import "./CommonStyle.css";

const AnnouncementBar = () => {
  return (
    <div className="announcement-wrapper">
      <div className="announcement-bar">
        <div className="announcement-track">
          <div className="announcement-slide">
            <p>Discover your scent of Class!</p>
          </div>
          <div className="announcement-slide">
            <p>Discover your scent of Luxury!</p>
          </div>
          <div className="announcement-slide">
            <p>Discover your scent of victory!</p>
          </div>
          <div className="announcement-slide">
            <p>Discover your scent of victory!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
