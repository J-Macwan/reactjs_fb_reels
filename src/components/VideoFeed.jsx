import React, { useState, useRef, useCallback } from "react";
import VideoPost from "./VideoPost";
import "./VideoFeed.css"; // optional

function VideoFeed() {
  // Example initial list of videos
  const initialVideos = [
    {
      id: 1,
      title: "Highlights: Match 1",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 10,
      shares: 2,
      comments: ["Great match!", "Wow!"],
    },
    {
      id: 2,
      title: "Highlights: Match 2",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      likes: 5,
      shares: 0,
      comments: [],
    },
  ];

  const [videos, setVideos] = useState(initialVideos);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Intersection Observer for infinite scrolling
  const lastVideoRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // If last video is visible and we still have more to load, load more
        if (entries[0].isIntersecting && hasMore) {
          loadMoreVideos();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const loadMoreVideos = () => {
    // Simulate fetching more videos
    if (videos.length >= 10) {
      // Limit to 10 for demo
      setHasMore(false);
      return;
    }
    const newVideos = Array.from({ length: 2 }, (_, i) => {
      const id = videos.length + i + 1;
      return {
        id,
        title: `Highlights: Match ${id}`,
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        likes: 0,
        shares: 0,
        comments: [],
      };
    });
    setVideos((prev) => [...prev, ...newVideos]);
  };

  return (
    <div className="video-feed">
      {videos.map((video, idx) => {
        // Attach ref to the last item for infinite scroll
        if (idx === videos.length - 1) {
          return (
            <div ref={lastVideoRef} key={video.id}>
              <VideoPost video={video} />
            </div>
          );
        }
        return <VideoPost key={video.id} video={video} />;
      })}
      {!hasMore && <p>No more videos to load.</p>}
    </div>
  );
}

export default VideoFeed;
