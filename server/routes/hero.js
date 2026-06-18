const express = require('express');
const router = express.Router();
const { getHero, setHero } = require('../controllers/heroController');
const { protect } = require('../controllers/authController');

router.get('/', getHero);
router.put('/', protect, setHero);
router.post('/', protect, setHero);

module.exports = router;
