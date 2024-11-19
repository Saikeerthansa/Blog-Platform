const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  console.log('Token received:', token); // Log token for debugging

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log('User not found for token:', decoded.id);
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Token valid for user:', req.user.username);
    console.log('User found:', req.user._id); 
    console.log('Authenticated user:', req.user);
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is an admin
const adminMiddleware = async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied, admin only' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
