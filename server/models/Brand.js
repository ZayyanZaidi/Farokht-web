const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  logo: {
    type: String
  },
  cover: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  whatsappGroupUrl: {
    type: String
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    facebook: { type: String, default: '' },
    website: { type: String, default: '' }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Brand', BrandSchema);
