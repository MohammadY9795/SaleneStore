import React, { useEffect, useRef, useState } from "react";
import "./ConcentrationCounters.css";

const countersData = [
  { img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/7_bottle.png?v=1724763886", title: "EAU DE TOILETTE", value: 7 },
  { img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/15_bottle.png?v=1724763886", title: "EAU DE PARFUM", value: 15 },
  { img: "https://cdn.shopify.com/s/files/1/0878/6981/7120/files/49_bottle_5d4ccf44-4ee0-4204-9f40-76e0883bb966.png?v=1724854897", title: "EXTRAIT DE PARFUM", value: 40 }
];

const ConcentrationCounters = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const countersRef = useRef([]);
  const titleRef = useRef(null);
  const subTextRef = useRef(null);
  const subText1Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCountersVisible(true);
            // Fade in texts
            if (titleRef.current) titleRef.current.style.opacity = 1;
            if (subTextRef.current) subTextRef.current.style.opacity = 1;
            if (subText1Ref.current) subText1Ref.current.style.opacity = 1;

            // Animate counters
            countersRef.current.forEach((counter, index) => {
              if (counter) {
                counter.style.opacity = 1;
                counter.style.transform = "translateY(0)";
                let count = 0;
                const target = countersData[index].value;
                const speed = 200;
                const step = () => {
                  if (count < target) {
                    count = Math.ceil(count + target / speed);
                    counter.innerText = count + "%";
                    requestAnimationFrame(step);
                  } else {
                    counter.innerText = target + "%";
                  }
                };
                setTimeout(step, index * 500);
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (countersRef.current.length) {
      countersRef.current.forEach((el) => {
        if (el) observer.observe(el);
      });
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="concentration-section">
      <h2 className="title-text" ref={titleRef}>CONCENTRATION</h2>
      <h3 className="sub-text1" ref={subText1Ref}>HA1O PERFUMES CONTAIN THE HIGHEST AMOUNT OF FRAGRANCE OILS; MORE THAN EDPS & EDTS</h3>
      <div className="counter-section">
        {countersData.map((c, i) => (
          <div key={i}>
            <img src={c.img} alt={c.title} className={countersVisible ? "visible" : ""} />
            <p>{c.title}</p>
            <div ref={(el) => countersRef.current[i] = el} className="counter">0%</div>
          </div>
        ))}
      </div>
      <h3 className="sub-text" ref={subTextRef}>MORE OIL MEANS SLOWER EVAPORATION AND THEREFORE A LONGER LASTING SCENT!</h3>
    </section>
  );
};

export default ConcentrationCounters;
