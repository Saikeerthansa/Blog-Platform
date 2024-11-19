
import React, { useState } from 'react';

const Comments = ({ postId, comments, onAddComment, onDeleteComment }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddComment(comment);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comments">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((c) => (
          <li key={c._id}>
            <p>{c.text}</p>
            {/* <button onClick={() => onDeleteComment(postId, c._id)}>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;