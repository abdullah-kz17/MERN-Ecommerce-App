const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  searchProducts,
  reviewProducts,
  updateReview,
  deleteReview,
  getFeaturedProducts,
  toggleFeaturedProduct,
} = require("../controllers/productController.js");

const protect = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMIddleware.js");
const { upload } = require("../config/cloudinary.js");

// Product routes
router.post('/', protect, adminMiddleware, upload.array('images', 5), createProduct);
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.patch('/featured/:id', protect, adminMiddleware, toggleFeaturedProduct);
router.get('/search', searchProducts);
router.get('/:id', getProductById);
router.put('/:id', protect, adminMiddleware, updateProductById);
router.delete('/:id', protect, adminMiddleware, deleteProductById);

// Review routes
router.post('/review/:id', protect, reviewProducts);
router.put('/:productId/reviews/:reviewId', protect, updateReview);
router.delete('/:productId/reviews/:reviewId', protect, deleteReview);

module.exports = router;
