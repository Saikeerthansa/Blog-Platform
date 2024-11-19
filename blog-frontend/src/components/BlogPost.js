import React from 'react';
import { Link } from 'react-router-dom';
import Likes from './Likes';

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      {post.image ? (
        <img src={post.image} alt="" className="post-image" />
      ) : (
        <div className="no-image"></div>
      )}
      <h3>{post.vulnerabilityTitle}</h3>
      <pre><code className={`language-${post.vulnerabilityCodeLang}`}>{post.vulnerabilityCode}</code></pre>
      <p>{post.vulnerabilityExplanation}</p>
      <pre><code className={`language-${post.mitigationCodeLang}`}>{post.mitigationCode}</code></pre>
      <p>{post.mitigationExplanation}</p>
      <Likes postId={post._id} likes={post.likes} />
      <Link to={`/post/${post._id}`}>Read More</Link>
    </div>
  );
};

export default BlogPost;
