import React, { useState, useRef, useCallback } from "react";
import Post from "./Post";
import "./Feed.css";

function Feed() {
  // Sample data
  const initialPosts = [
    {
      id: 1,
      userName: "हँसते रहो",
      content: "बहुत ही अनोखी मज़ाक की बात !",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      likes: 10,
      comments: []
    },
    {
      id: 2,
      userName: "S a d Thinking",
      content: "This is a text-only post.",
      videoUrl: "",
      likes: 2,
      comments: []
    }
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  const loadMorePosts = () => {
    if (posts.length >= 5) {
      // Stop after 5 posts for demo
      setHasMore(false);
      return;
    }
    const newPosts = [
      {
        id: 3,
        userName: "Another User",
        content: "Here's another post with a video",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        likes: 0,
        comments: []
      }
    ];
    setPosts((prev) => [...prev, ...newPosts]);
  };

  return (
    <div className="feed">
      <div className="feed-inner">
        {posts.map((post, idx) => {
          if (idx === posts.length - 1) {
            return (
              <div ref={lastPostRef} key={post.id}>
                <Post post={post} />
              </div>
            );
          }
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
}

export default Feed;
