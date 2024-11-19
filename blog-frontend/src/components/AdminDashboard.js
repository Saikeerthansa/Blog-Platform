import React, { useState, useEffect } from 'react';
import { registerAdmin } from '../api/users';

const AdminDashboard = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleRegisterAdmin = async (e) => {
    e.preventDefault(); 
    try {
      const adminData = { username, password };
      await registerAdmin(adminData); // Ensure only admins can hit this API
      setSuccess('Admin registered successfully');
      setUsername('');
      setPassword('');
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(null), 3000);
    }
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  }, [success, error]);

  return (
    <div className="admin-dashboard">
      <form onSubmit={handleRegisterAdmin} className="post-form">
      <h1>Admin Dashboard</h1>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register Admin</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};

export default AdminDashboard;
