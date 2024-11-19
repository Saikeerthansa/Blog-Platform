import React, { useState, useEffect } from 'react';
import { likePost } from '../api/posts';

const Likes = ({ postId, initialLikes, userHasLiked }) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(userHasLiked);

  const handleLikeToggle = async () => {
    try {
      const response = await likePost(postId);
      setLikeCount(response.likes);
      setHasLiked(!hasLiked); // Toggle like status
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="likes">
      <button onClick={handleLikeToggle}>
        {hasLiked ? 'Dislike' : 'Like'}
      </button>
      <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
    </div>
  );
};

export default Likes;
