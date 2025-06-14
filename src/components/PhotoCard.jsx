import React from "react";
import "./PhotoCard.css";

const PhotoCard = ({ photo }) => {
  return (
    <div className="photo-card">
      <img src={photo.url} alt={photo.title} />
      <h4>{photo.title}</h4>
    </div>
  );
};

export default PhotoCard;
