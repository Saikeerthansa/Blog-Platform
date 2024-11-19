const express = require('express');
const { createPost, getPosts, getPostById, updatePost, deletePost, likePost, addComment, deleteComment,getPostsByUser } = require('../controllers/postController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.post('/:id/like', authMiddleware, likePost);
router.post('/:id/comment', authMiddleware, addComment); // Adjust authentication as needed
router.delete('/:id/comment/:commentId', authMiddleware, deleteComment); // Adjust authentication as needed
router.get('/user', authMiddleware, getPostsByUser);

module.exports = router;