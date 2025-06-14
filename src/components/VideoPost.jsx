import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import "./VideoPost.css"; // optional for styling

function VideoPost({ video }) {
  const [likes, setLikes] = useState(video.likes || 0);
  const [comments, setComments] = useState(video.comments || []);
  const [shares, setShares] = useState(video.shares || 0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
    // Sync with server if needed
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
    alert("Video shared!");
    // Sync with server if needed
  };

  return (
    <div className="video-post">
      {/* Title or channel info, optional */}
      <div className="video-post-header">
        <h4>{video.title}</h4>
      </div>

      {/* The video itself */}
      <VideoPlayer src={video.videoUrl} />

      {/* Action icons */}
      <div className="video-post-actions">
        <button onClick={handleLike} className="action-btn">
          {/* Like icon (could be an SVG or an emoji) */}
          <span role="img" aria-label="like">
            👍
          </span>
          <span className="count">{likes}</span>
        </button>

        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="action-btn"
        >
          {/* Comment icon */}
          <span role="img" aria-label="comment">
            💬
          </span>
          <span className="count">{comments.length}</span>
        </button>

        <button onClick={handleShare} className="action-btn">
          {/* Share icon */}
          <span role="img" aria-label="share">
            🔗
          </span>
          <span className="count">{shares}</span>
        </button>
      </div>

      {/* Comment box (toggles open on comment icon click) */}
      {showComments && (
        <div className="video-post-comments">
          <div className="comments-list">
            {comments.map((comment, idx) => (
              <div key={idx} className="comment-item">
                {comment}
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

export default VideoPost;
