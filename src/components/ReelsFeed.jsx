import React, { useState } from "react";
import Reel from "./Reel";
import "./ReelsFeed.css";

function ReelsFeed() {
  // Example reels data
  const [reels] = useState([
    {
      id: 1,
      userName: "NitaGunawan",
      caption: `We listen we don't judge\n"Cewe juga b1s kecihat sepert1 ini"`,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 44200,
      comments: ["So true!", "Love this reel."],
      shares: 448,
    },
    {
      id: 2,
      userName: "anotherUser",
      caption: "Check out my new reel!",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      likes: 120,
      comments: [],
      shares: 2,
    },
    // Add more reels as needed...
  ]);

  // Index of the currently displayed reel
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => {
    alert("Close reels view");
    // In a real app, you'd navigate away or hide this component
  };

  const handleCreateReel = () => {
    alert("Create reel clicked");
    // In a real app, you'd show a reel creation UI
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next < reels.length ? next : 0; // wrap around or clamp
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      return next >= 0 ? next : reels.length - 1; // wrap around or clamp
    });
  };

  const currentReel = reels[currentIndex];

  return (
    <div className="reels-feed">
      {/* Top bar with close (X) and Create reel */}
      <div className="reels-top-bar">
        <button className="close-btn" onClick={handleClose}>
          ✕
        </button>
        <button className="create-reel-btn" onClick={handleCreateReel}>
          Create reel
        </button>
      </div>

      {/* The reel container with next/prev arrows */}
      <div className="reel-container">
        <button className="nav-arrow left-arrow" onClick={handlePrev}>
          ‹
        </button>
        <Reel reel={currentReel} />
        <button className="nav-arrow right-arrow" onClick={handleNext}>
          ›
        </button>
      </div>
    </div>
  );
}

export default ReelsFeed;
