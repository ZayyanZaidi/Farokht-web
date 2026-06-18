const express = require('express');
const router = express.Router();
const { getBackgrounds, setBackground, resetBackground } = require('../controllers/backgroundController');
const { protect } = require('../controllers/authController');

router.get('/', getBackgrounds);
router.put('/:sectionId', protect, setBackground);
router.delete('/:sectionId', protect, resetBackground);

module.exports = router;
