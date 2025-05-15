const express = require('express');
const { createCart, getCart, updateCart, removeProductFromCart, clearCart } = require('../controllers/cartController');
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// Create or update cart
router.post('/create', protect,createCart);

// Get cart details
router.get('/', protect,getCart);

// Update cart quantity
router.put('/update', protect, updateCart);

// Remove product from cart
router.delete('/remove/:productId',protect, removeProductFromCart);

// Clear cart
router.delete('/clear', protect,clearCart);

module.exports = router;
