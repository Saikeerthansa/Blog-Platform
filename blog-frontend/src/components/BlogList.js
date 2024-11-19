import React from 'react';
import { Link } from 'react-router-dom';

const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <div className="blog-post" key={post._id}>
          <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
          <h4>{post.vulnerabilityTitle ? post.vulnerabilityTitle.substring(0, 100) : 'No content available'}...</h4> {/* Safeguard against undefined content */}
          {post.image && <img src={post.image} alt={post.title} />}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
