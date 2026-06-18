const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  authorName: {
    type: String,
    default: 'Farokht'
  },
  title: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  mediaUrl: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'GUIDES'
  },
  postType: {
    type: String,
    enum: ['blog', 'hero'],
    default: 'blog'
  },
  isHero: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);
