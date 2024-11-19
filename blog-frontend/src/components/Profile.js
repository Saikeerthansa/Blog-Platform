import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import userLogo from '../OIP.jpg'; // Import the image

const Profile = ({ user, userBlogs }) => {
  if (!user) return <p>Please log in to view your profile.</p>;

  // Debugging: Check the userBlogs prop
  console.log('User Blogs:', userBlogs);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          className="profile-logo"
          src={userLogo} // Use the imported image here
          alt="User Logo"
        />
        <h2>{user.username}'s Profile</h2>
        <p>Email: {user.email}</p>
        {/* Add more details if needed */}
      </div>
      
      <div className="profile-blogs">
        <h3>Your Blogs</h3>
        {userBlogs && userBlogs.length > 0 ? (
          <ul className="blog-list">
            {userBlogs.map((blog) => (
              <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No blogs created yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
