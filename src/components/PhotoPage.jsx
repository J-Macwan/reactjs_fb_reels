import React from "react";
import "./PhotoPage.css";
import PhotoCard from "./PhotoCard";

const PhotoPage = () => {
  // Dummy data for photos
  const photos = [
    { id: 1, title: "Photo 1", url: "https://via.placeholder.com/300" },
    { id: 2, title: "Photo 2", url: "https://via.placeholder.com/300" },
    { id: 3, title: "Photo 3", url: "https://via.placeholder.com/300" },
    { id: 4, title: "Photo 4", url: "https://via.placeholder.com/300" },
    { id: 5, title: "Photo 5", url: "https://via.placeholder.com/300" }
  ];

  return (
    <div className="photo-page">
      <h2>Photo Gallery</h2>
      <div className="photos-container">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default PhotoPage;
