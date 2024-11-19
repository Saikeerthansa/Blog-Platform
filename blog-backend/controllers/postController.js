const mongoose = require('mongoose');
const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  const {
    title, vulnerabilityTitle, vulnerabilityExplanation, vulnerabilityCode,
    vulnerabilityOutput, mitigationExplanation, mitigationCode, mitigationOutput,
    image
  } = req.body;

  try {
    const newPost = new Post({
      title,
      vulnerabilityTitle,
      vulnerabilityExplanation,
      vulnerabilityCode, // Directly assign
      vulnerabilityOutput, // Directly assign
      mitigationExplanation,
      mitigationCode, // Directly assign
      mitigationOutput, // Directly assign
      image,
      likes: 0,
      comments: [],
      user: req.user._id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating post', error });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    // Ensure req.user exists and req.user._id is a valid ObjectId
    if (!req.user || !mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: 'Invalid or missing user ID' });
    }

    const userId = mongoose.Types.ObjectId(req.user._id); // Convert to ObjectId

    const userPosts = await Post.find({ user: userId }).populate('user', 'username');

    if (!userPosts || userPosts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user' });
    }

    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).json({ message: 'Server error while fetching user posts', error });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate('user', 'username isAdmin').populate('comments');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Convert stored objects back to Maps
    post.vulnerabilityCode = new Map(Object.entries(post.vulnerabilityCode));
    post.vulnerabilityOutput = new Map(Object.entries(post.vulnerabilityOutput));
    post.mitigationCode = new Map(Object.entries(post.mitigationCode));
    post.mitigationOutput = new Map(Object.entries(post.mitigationOutput));

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post', error });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const {
    title, vulnerabilityTitle, vulnerabilityExplanation, vulnerabilityCode,
    vulnerabilityOutput, mitigationExplanation, mitigationCode, mitigationOutput,
    image
  } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Check if the logged-in user is the creator or an admin
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title;
    post.vulnerabilityTitle = vulnerabilityTitle;
    post.vulnerabilityExplanation = vulnerabilityExplanation;
    post.vulnerabilityCode = vulnerabilityCode;
    post.vulnerabilityOutput = vulnerabilityOutput;
    post.mitigationExplanation = mitigationExplanation;
    post.mitigationCode = mitigationCode;
    post.mitigationOutput = mitigationOutput;
    post.image = image;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    // Check if the logged-in user is the creator or an admin
    if (post.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error });
  }
};

exports.likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userId = req.user._id.toString();
    const likedIndex = post.likedBy.findIndex((user) => user.toString() === userId);

    if (likedIndex === -1) {
      // User hasn't liked the post yet, add like
      post.likes += 1;
      post.likedBy.push(req.user._id);
    } else {
      // User has liked the post, remove like
      post.likes -= 1;
      post.likedBy.splice(likedIndex, 1);
    }

    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Error liking post', error });
  }
};

exports.addComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      console.log('Post not found with id:', id);
      return res.status(404).json({ message: 'Post not found' });
    }
    if (!text) {
      console.log('Comment text is missing');
      return res.status(400).json({ message: 'Comment text is required' });
    }

    // Ensure req.user has _id
    if (!req.user || !req.user._id) {
      console.log('User not authenticated or user ID missing');
      return res.status(401).json({ message: 'User not authenticated' });
    }

    console.log('Adding comment to post:', id);
    post.comments.push({ text, user: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error('Error adding comment:', error); // Log the error details
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = post.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // User authorization
    if (comment.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    comment.remove();
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};