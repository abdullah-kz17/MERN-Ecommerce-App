const Product = require('../models/productModel');
const Cart = require('../models/cartModel');

// 1. Create or Update Cart (Add product to cart or update the quantity)
const createCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
      });
    }

    cart.calculateTotalPrice();

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price description images',
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart: populatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 2. Get Cart (View Cart)
const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      select: 'name price description images',
    });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 3. Update Cart (Update the quantity of a product)
const updateCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: 'Product not in cart' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Quantity must be greater than zero' });
    }

    existingItem.quantity = quantity;

    cart.calculateTotalPrice();

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price description image',
    });

    res.status(200).json({
      success: true,
      message: 'Cart updated successfully',
      cart: populatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 4. Remove product from cart
const removeProductFromCart = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.params; // Product ID to remove

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not in cart' });
    }

    cart.items.splice(itemIndex, 1); // Remove the item from the cart

    cart.calculateTotalPrice();

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate({
      path: 'items.product',
      select: 'name price description image',
    });

    res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      cart: populatedCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// 5. Clear Cart (Optional)
const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = []; // Clear the cart's items

    cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  createCart,
  getCart,
  updateCart,
  removeProductFromCart,
  clearCart,
};
