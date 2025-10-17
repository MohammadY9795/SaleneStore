import React, { useRef, useState, useEffect } from 'react';
import './Home.css';
import bannerThumbnail from '../assets/images/ProductBanner.png';
import bannerVideo from '../assets/videos/SaleneVid.mp4';
import ProductCarousel from '../Component/ProductCarousel';
import { BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import  prdct1  from "../assets/images/prdct1.png";
import  prdct2 from "../assets/images/prdct2.png";
import  prdct3 from "../assets/images/prdct3.png";
import  prdct4 from "../assets/images/prdct4.png";
import AnnouncementBar from '../Component/AnnouncementBar';
import RichTextSection from '../Component/RichTextSection';


const products = [
  {
    id: 1,
    name: "Halo Date",
    description: "A scent that turns heads and wins hearts. Set Vibes, Make Magic",
    image: prdct1,
    buttonLabel: "BUY NOW",
  },
  {
    id: 2,
    name: "Halo Day",
    description: "Your daily dose of confidence. Fresh Start, All Day",
    image: prdct2,
    buttonLabel: "BUY NOW",
  },
  {
    id: 3,
    name: "Halo Night",
    description: "Capture the night, own the spotlight. Dark, Bold, Unstoppable",
    image: prdct3,
    buttonLabel: "BUY NOW",
  },
  {
    id: 3,
    name: "Halo Night",
    description: "Capture the night, own the spotlight. Dark, Bold, Unstoppable",
    image: prdct4,
    buttonLabel: "BUY NOW",
  },
];

const Home = () => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    const savedPreference = localStorage.getItem('videoMuted');
    return savedPreference ? JSON.parse(savedPreference) : false;
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = isMuted;
    }
  };

  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('videoMuted', JSON.stringify(newMuted));
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  };
  const isMobileDevice = () => window.innerWidth <= 768;

  return (
    <>
    <div className="home-page bg-dark text-white">
      <div 
  className="video-banner position-relative"
  onMouseEnter={!isMobileDevice() ? handleMouseEnter : undefined}
  onMouseLeave={!isMobileDevice() ? () => setIsHovered(false) : undefined}
>
        {!isHovered && (
          <img 
            src={bannerThumbnail} 
            alt="Banner Thumbnail" 
            className="w-100 banner-thumbnail" 
          />
        )}
        <video
          ref={videoRef}
          src={bannerVideo}
          className={`w-100 banner-video ${isHovered ? 'd-block' : 'd-none'}`}
          loop
        />
        {isHovered && (
          <button 
            className="mute-toggle-btn position-absolute bottom-0 end-0 m-3 btn btn-outline-light btn-sm"
            onClick={handleMuteToggle}
          >
            {isMuted ? <BsVolumeMute size={20} /> : <BsVolumeUp size={20} />}
          </button>
        )}
      </div>
    </div>
    <div>
      <RichTextSection />
    </div>
    <div>
      <AnnouncementBar />
    </div>
    <div>
      <ProductCarousel products={products} />
    </div>
    </>
  );
};

export default Home;
