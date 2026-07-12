const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middleware/auth');

// Import Multer middleware
const upload = require('../middleware/upload');

// Public Routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Admin Routes
router.post(
  '/',
  protect,
  adminOnly,
  upload.single('mainImg'),
  createProduct
);

router.put(
  '/:id',
  protect,
  adminOnly,
  upload.single('mainImg'),
  updateProduct
);

router.delete(
  '/:id',
  protect,
  adminOnly,
  deleteProduct
);

module.exports = router;