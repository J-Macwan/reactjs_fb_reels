import React from "react";
import "./WatchPage.css";
import VideoCard from "./VideoCard";

const WatchPage = () => {
  // Dummy data for videos
  const videos = [
    { id: 1, title: "Video 1", thumbnail: "https://via.placeholder.com/300" },
    { id: 2, title: "Video 2", thumbnail: "https://via.placeholder.com/300" },
    { id: 3, title: "Video 3", thumbnail: "https://via.placeholder.com/300" },
    { id: 4, title: "Video 4", thumbnail: "https://via.placeholder.com/300" }
  ];

  return (
    <div className="watch-page">
      <h2>Watch Videos</h2>
      <div className="videos-container">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
