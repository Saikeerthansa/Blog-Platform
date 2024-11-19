import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const NavBar = ({ user, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const toggleTheme = () => {
    setDarkMode((prevState) => {
      const newDarkMode = !prevState;
      document.body.classList.toggle('dark-mode', newDarkMode);
      return newDarkMode;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate('/');
  };

  const handleLoginClick = () => {
    closeMenu();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={toggleMenu}>
        ☰
      </button>
      <div className="logo">
        <Link to="/" onClick={closeMenu}>Blog Platform</Link>
      </div>
      <button className="theme-btn" onClick={toggleTheme}>
        {darkMode ? '☀' : '🌙'}
      </button>
      {menuOpen && (
        <div className="sidebar-menu open">
          <button className="close-btn" onClick={closeMenu}>
            ←
          </button>
          <ul>
            <li>
              <Link to="/new-post" onClick={closeMenu}>Create Blog</Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </li>
            {!user && (
              <li>
                <Link to="/register" onClick={closeMenu}>Register</Link>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Link to="/profile" onClick={closeMenu}>Profile</Link>
                </li>
                {user.isAdmin && (
                  <li>
                    <Link to="/admin" onClick={closeMenu}>Admin Dashboard</Link>
                  </li>
                )}
              </>
            )}
          </ul>
          <div className="auth-button-container">
            {user ? (
              <button onClick={handleLogout} className="auth-button">Logout</button>
            ) : (
              <button onClick={handleLoginClick} className="auth-button">Login</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
