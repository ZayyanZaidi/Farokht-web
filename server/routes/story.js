const express = require('express');
const router = express.Router();
const { getStories, getStory, createStory, updateStory, deleteStory } = require('../controllers/storyController');
const { protect } = require('../controllers/authController');

router.get('/', getStories);
router.get('/:id', getStory);
router.post('/', protect, createStory);
router.put('/:id', protect, updateStory);
router.delete('/:id', protect, deleteStory);

module.exports = router;
