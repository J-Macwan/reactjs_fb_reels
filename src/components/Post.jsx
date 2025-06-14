import React, { useState } from "react";
import "./Post.css";
import VideoPlayer from "./VideoPlayer";

function Post({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [comments, setComments] = useState(post.comments || []);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const commentText = e.target.elements.comment.value;
    if (!commentText.trim()) return;
    setComments([...comments, commentText]);
    e.target.reset();
  };

  const handleShare = () => {
    alert("Post shared!");
  };

  return (
    <div className="post">
      <div className="post-header">
        <h4>{post.userName}</h4>
        <button className="follow-btn">Follow</button>
      </div>

      {post.videoUrl && <VideoPlayer src={post.videoUrl} />}

      <div className="post-body">{post.content}</div>

      <div className="post-actions">
        <button onClick={handleLike}>Like {likes}</button>
        <button onClick={() => setShowComments(!showComments)}>
          Comment {comments.length}
        </button>
        <button onClick={handleShare}>Share</button>
      </div>

      {showComments && (
        <div className="post-comments">
          {comments.map((comment, idx) => (
            <div key={idx} className="comment">
              {comment}
            </div>
          ))}
          <form onSubmit={handleComment}>
            <input
              name="comment"
              placeholder="Write a comment..."
              autoComplete="off"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default Post;
