const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductsByBrand,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect } = require('../controllers/authController');

router.get('/', getAllProducts);
router.get('/brand/:brandId', getProductsByBrand);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
