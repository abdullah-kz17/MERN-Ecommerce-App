const express = require('express');
const {
  getAllUsers,
  deleteUser,
  updateUser,
} = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const adminMiddleware = require("../middlewares/adminMIddleware")

const router = express.Router();

// Admin routes
router.get('/', protect, adminMiddleware, getAllUsers);
router.put('/:id', protect, adminMiddleware, updateUser);
router.delete('/:id', protect, adminMiddleware, deleteUser);

module.exports = router;
