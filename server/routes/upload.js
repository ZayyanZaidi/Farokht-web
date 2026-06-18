const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { protect } = require('../controllers/authController');

router.post('/', protect, (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message || 'Upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    const mediaUrl = `/uploads/${req.file.filename}`;

    res.status(201).json({
      mediaUrl,
      mediaType,
      filename: req.file.filename,
      originalName: req.file.originalname
    });
  });
});

module.exports = router;
