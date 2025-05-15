const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const sendEmail = require("../config/sendMail")

const createOrder = async (req, res) => {
    const userId = req.user._id;
    const {shippingInfo, paymentMethod = 'Cash on Delivery'} = req.body;

    try {
        const cart = await Cart.findOne({user: userId}).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({success: false, message: 'Cart is empty'});
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
        }));

        const totalPrice = cart.totalPrice;

        const newOrder = new Order({
            user: userId,
            items: orderItems,
            shippingInfo,
            paymentMethod,
            totalPrice,
        });

        await newOrder.save();

        // Update stock
        for (const item of cart.items) {
            const product = item.product;
            product.stock -= item.quantity;
            if (product.stock < 0) {
                return res.status(400).json({success: false, message: `Not enough stock for ${product.name}`});
            }
            await product.save();
        }

        // Clear the cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(201).json({success: true, message: 'Order placed successfully', order: newOrder});
    } catch (err) {
        console.error(err);
        res.status(500).json({success: false, message: 'Server Error'});
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user._id}).sort({createdAt: -1}).populate('items.product', 'name price images');
        res.status(200).json({success: true, orders});
    } catch (error) {
        res.status(500).json({success: false, message: 'Unable to fetch orders'});
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({createdAt: -1})
            .populate('items.product', 'name price images')
            .populate('user', 'username email');

        res.status(200).json({success: true, orders});
    } catch (error) {
        res.status(500).json({success: false, message: 'Unable to fetch orders'});
    }
};

const updateOrderStatus = async (req, res) => {
    const {id} = req.params;
    const {isPaid, isDelivered} = req.body;

    try {
        const order = await Order.findById(id).populate('user', 'username email');

        if (!order) {
            return res.status(404).json({success: false, message: 'Order not found'});
        }

        const updates = [];
        if (isPaid !== undefined) {
            order.isPaid = isPaid;
            order.paidAt = isPaid ? new Date() : null;
            updates.push('paid');
        }

        if (isDelivered !== undefined) {
            order.isDelivered = isDelivered;
            order.deliveredAt = isDelivered ? new Date() : null;
            updates.push('delivered');
        }

        await order.save();

        // Send email if paid or delivered
        const {email, username} = order.user;
        const emailParts = [];

        if (isPaid) {
            emailParts.push(`
        <p style="margin: 0;">Hi ${username},</p>
        <p>Your payment for Order <strong>${order._id}</strong> has been received. Thank you!</p>
      `);
        }

        if (isDelivered) {
            emailParts.push(`
        <p style="margin: 0;">Hi ${username},</p>
        <p>Your order <strong>${order._id}</strong> has been delivered. We hope you enjoy it!</p>
      `);
        }

        if (emailParts.length > 0) {
            const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; background: white; margin: auto; padding: 20px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            ${emailParts.join('<hr style="border:none;border-top:1px solid #eee;margin:20px 0;" />')}
            <p style="color: #888; font-size: 12px;">If you have any questions, please contact our support team.</p>
          </div>
        </div>
      `;

            await sendEmail(email, 'Order Update from YourApp', html);
        }

        res.status(200).json({success: true, message: 'Order status updated', order});

    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({success: false, message: 'Error updating order'});
    }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user._id;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (order.user.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this order' });
    }

    await order.deleteOne();

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = {createOrder, getUserOrders, getAllOrders, updateOrderStatus,deleteOrder};
