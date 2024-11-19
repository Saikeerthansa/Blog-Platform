import React, { useState, useEffect } from 'react';
import BlogList from '../components/BlogList';
import { getPosts } from '../api/posts';

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home-page-content">
      <h1>Welcome to the Blog</h1>
      <BlogList posts={posts} />
    </div>
  );
};

export default HomePage;