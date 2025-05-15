const express = require('express');
const { createOrder,getUserOrders, getAllOrders,updateOrderStatus, deleteOrder} = require('../controllers/orderController');
const protect = require('../middlewares/authMiddleware');
const adminMiddleware = require("../middlewares/adminMIddleware")

const router = express.Router();

router.post('/create', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
router.get('/all-orders', protect,adminMiddleware, getAllOrders);  
router.delete('/delete-order/:id', protect, deleteOrder);
router.put('/update-order/:id', protect,adminMiddleware, updateOrderStatus);

module.exports = router;
