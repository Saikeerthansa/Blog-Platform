import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NewPostPage from './pages/NewPostPage';
// import PostForm from './components/PostForm';
import PostPage from './pages/PostPage';
import EditPostPage from './pages/EditPostPage';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import { getUser } from './api/users';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          console.log('Fetching user with token:', token);
          const userData = await getUser();
          console.log('User data fetched:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const onLogin = (userData) => {
    localStorage.setItem('token', userData.token); // Save token on login
    setUser({ token: userData.token, isAdmin: userData.isAdmin });
    console.log('Updated user state:', userData);
  }; 

  const onLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <NavBar user={user} onLogout={onLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage posts={posts} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/new-post" element={<NewPostPage user={user} onPostCreated={handlePostCreated} />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPostPage />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;