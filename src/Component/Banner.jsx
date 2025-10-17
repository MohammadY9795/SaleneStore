import React, { useRef, useEffect } from "react";
import "./CommonStyle.css";
import { BsVolumeMute, BsVolumeUp } from "react-icons/bs";

const Banner = ({ src, poster, isMuted = true, onMuteToggle, showMuteControl = false }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (v) v.pause();
    };
  }, []);

  const safePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !!isMuted;
    try {
      await v.play();
    } catch (err) {
      // ignore browser autoplay restrictions
    }
  };

  const safePause = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  const handleMouseEnter = () => safePlay();
  const handleMouseLeave = () => safePause();

  const handleVideoClick = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) safePlay();
    else safePause();
  };

  return (
    <div
      className="banner-wrapper position-relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="banner-video"
        src={src}
        poster={poster}
        playsInline
        muted={isMuted}
        preload="metadata"
        onClick={handleVideoClick}
      />
      {showMuteControl && typeof onMuteToggle === "function" && (
        <button
          className="mute-toggle-btn position-absolute bottom-0 end-0 m-3 btn btn-outline-light btn-sm"
          onClick={(e) => {
            e.stopPropagation(); // prevent toggling play/pause when clicking mute button
            onMuteToggle();
          }}
          aria-label="Toggle mute"
        >
          {isMuted ? <BsVolumeMute size={18} /> : <BsVolumeUp size={18} />}
        </button>
      )}
    </div>
  );
};

export default Banner;