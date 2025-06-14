import React from "react";
import "./VideoCard.css";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <img src={video.thumbnail} alt={video.title} />
      <h4>{video.title}</h4>
    </div>
  );
};

export default VideoCard;
