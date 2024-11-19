const express = require('express');
const { registerUser, loginUser, getUser, registerAdmin } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/register/admin', authMiddleware, adminMiddleware, registerAdmin);
router.post('/login', loginUser);
router.get('/user', authMiddleware, getUser);

module.exports = router;
