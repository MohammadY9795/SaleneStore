import React from "react";

const AnnouncementBar = ({ items = [
  { text: "This site has limited support for your browser. We recommend switching to Edge, Chrome, Safari, or Firefox." },
  { text: "BUY3 @999 on 1 100ml & 2 20ml. Limited time Offer!" },
  { text: "Buy 2 @999 on 100LML. Limited Time Offer!" },
] }) => {
  const marqueeText = items.map((i) => i.text).join(" \u00A0 • \u00A0 ");
  return (
    <div className="announcement-bar py-2">
      <div className="announcement-marquee">
        <div className="announcement-marquee__track">
          {marqueeText} \u00A0 • \u00A0 {marqueeText}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;