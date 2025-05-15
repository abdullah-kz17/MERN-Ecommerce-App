const User = require('../models/userModel');

// GET all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

// DELETE user
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.remove();
  res.json({ message: 'User deleted' });
};

// UPDATE user (admin)
exports.updateUser = async (req, res) => {
  const { username, email, isAdmin } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.username = username || user.username;
  user.email = email || user.email;
  user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

  const updatedUser = await user.save();
  res.json(updatedUser);
};
