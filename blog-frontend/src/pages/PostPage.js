import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById, likePost, deletePost } from '../api/posts';
import Comments from '../components/Comments';
import { addComment, deleteComment } from '../api/comments';
import { getUser } from '../api/users';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('C');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchPost();
    fetchUser();
  }, [id]);

  const handleLike = async () => {
    try {
      const updatedPost = await likePost(id);
      setPost((prevPost) => ({ ...prevPost, likes: updatedPost.likes }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (comment) => {
    try {
      const newComment = await addComment(id, comment);
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment.comments[newComment.comments.length - 1]],
      }));
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    }, (err) => {
      console.error('Failed to copy code:', err);
    });
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(id);
      navigate('/'); // Redirect to the home page after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const isOwnerOrAdmin = post.user && user && (post.user._id === user._id || user.isAdmin);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="post-page">
      <h1>{post.title}</h1>
      {post.image ? (
        <img src={post.image} alt="" className="post-image" />
      ) : (
        <div className="no-image"></div>
      )}
      {/* Display vulnerability information */}
      <h3>{post.vulnerabilityTitle}</h3>
      <p>{post.vulnerabilityExplanation}</p>
      <div className="code-container">
        <div className="code-actions">
          <button className="copy-btn" onClick={() => copyToClipboard(post.vulnerabilityCode[language] || '')}>📋</button>
          <div className="languages">
            <button className={`language-btn ${language === 'C' ? 'active' : ''}`} onClick={() => changeLanguage('C')}>C</button>
            <button className={`language-btn ${language === 'C++' ? 'active' : ''}`} onClick={() => changeLanguage('C++')}>C++</button>
            {/* Add more language options if needed */}
          </div>
        </div>
        <pre><code className={language}>{post.vulnerabilityCode[language] || 'No code available'}</code></pre>
      </div>
      <div className="output-title">Vulnerability Output:</div>
      <div className="output-container">
        <p className="output-text">{post.vulnerabilityOutput[language] || 'No output available'}</p>
      </div>
      <h4>Mitigation</h4>
      <p>{post.mitigationExplanation}</p>
      <div className="code-container">
        <div className="code-actions">
          <button className="copy-btn" onClick={() => copyToClipboard(post.mitigationCode[language] || '')}>📋</button>
          <div className="languages">
            <button className={`language-btn ${language === 'C' ? 'active' : ''}`} onClick={() => changeLanguage('C')}>C</button>
            <button className={`language-btn ${language === 'C++' ? 'active' : ''}`} onClick={() => changeLanguage('C++')}>C++</button>
            {/* Add more language options if needed */}
          </div>
        </div>
        <pre><code className={language}>{post.mitigationCode[language] || 'No code available'}</code></pre>
      </div>
      <div className="output-title">Mitigation Output:</div>
      <div className="output-container">
        <p className="output-text">{post.mitigationOutput[language] || 'No output available'}</p>
      </div>
      {user && ( // Show these buttons only if the user is logged in
        <div>
          {isOwnerOrAdmin && (
            <div className="button-container">
              <button onClick={() => navigate(`/edit/${id}`)}>
                <span className="button_top">Edit Post</span>
              </button>
              <button onClick={handleDeletePost}>
                <span className="button_top">Delete Post</span>
              </button>
            </div>
          )}
        </div>
      )}
      <div>
      <button class="Btn" onClick={handleLike}>
        <span class="leftContainer">
          <svg fill="white" viewBox="0 0 512 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"></path>
          </svg>
          <span class="like">Like</span>
        </span>
        <span class="likeCount">{post.likes}</span>
      </button>
      </div>
      <Comments
        postId={id}
        comments={post.comments}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
};

export default PostPage;
