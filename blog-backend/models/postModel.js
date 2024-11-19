const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  vulnerabilityTitle: {
    type: String,
    required: true,
  },
  vulnerabilityExplanation: {
    type: String,
    required: true,
  },
  vulnerabilityCode: {
    type: Map,
    of: String,
    required: true,
  },
  vulnerabilityOutput: {
    type: Map,
    of: String,
    required: true,
  },
  mitigationExplanation: {
    type: String,
    required: true,
  },
  mitigationCode: {
    type: Map,
    of: String,
    required: true,
  },
  mitigationOutput: {
    type: Map,
    of: String,
    required: true,
  },
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Post', postSchema);
