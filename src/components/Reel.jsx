import React, { useState, useRef, useEffect } from "react";
import "./Reel.css";

function Reel({ reel }) {
  const videoRef = useRef(null);

  // Local states
  const [likes, setLikes] = useState(reel.likes || 0);
  const [comments, setComments] = useState(reel.comments || []);
  const [shares, setShares] = useState(reel.shares || 0);
  const [showComments, setShowComments] = useState(false);

  // Autoplay logic
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay blocked:", err);
      });
    }
  }, [reel.videoUrl]);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    // Sync with server if needed
  };

  const handleCommentToggle = () => {
    setShowComments((prev) => !prev);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;
    if (!commentText.trim()) return;
    setComments((prev) => [...prev, commentText]);
    e.target.reset();
    // Sync with server if needed
  };

  const handleShare = () => {
    setShares((prev) => prev + 1);
    alert("Reel shared!");
    // Sync with server if needed
  };

  return (
    <div className="reel">
      {/* The vertical reel video */}
      <video
        ref={videoRef}
        className="reel-video"
        src={reel.videoUrl}
        loop
        muted
        controls
      />

      {/* Overlay with user info, caption, and icons */}
      <div className="reel-overlay">
        <div className="reel-user-info">
          <h4>@{reel.userName}</h4>
          <p className="reel-caption">{reel.caption}</p>
        </div>
        <div className="reel-icons">
          <button onClick={handleLike} className="icon-btn">
            <span role="img" aria-label="like">👍</span>
            <span>{likes}</span>
          </button>
          <button onClick={handleCommentToggle} className="icon-btn">
            <span role="img" aria-label="comment">💬</span>
            <span>{comments.length}</span>
          </button>
          <button onClick={handleShare} className="icon-btn">
            <span role="img" aria-label="share">↗️</span>
            <span>{shares}</span>
          </button>
        </div>
      </div>

      {/* Comment box at the bottom if toggled */}
      {showComments && (
        <div className="reel-comments">
          <div className="comments-list">
            {comments.map((cmt, idx) => (
              <div key={idx} className="comment-item">
                {cmt}
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              name="comment"
              placeholder="Write a comment..."
              autoComplete="off"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Reel;
