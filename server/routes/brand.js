const express = require('express');
const router = express.Router();
const { getBrands, getBrandByHandle, getMyBrand, createBrand, updateBrand, verifyBrand } = require('../controllers/brandController');
const { protect } = require('../controllers/authController');

router.get('/', getBrands);
router.get('/me', protect, getMyBrand);
router.get('/:handle', getBrandByHandle);
router.post('/', protect, createBrand);
router.put('/', protect, updateBrand);
router.put('/verify/:id', protect, verifyBrand);

module.exports = router;
