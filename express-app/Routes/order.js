const express = require('express');
const Order = require('../Models/Order');
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');
const router = express.Router();
const mongoose = require('mongoose');

// Create a new order
router.post('/:userId/create', verifyTokenAndAutherization, async (req, res) => {
  try {
    console.log("Creating order for user:", req.params.userId);
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const { books, totalPrice } = req.body;
    const newOrder = new Order({
      userId: req.params.userId,
      books,
      totalPrice,
      paymentStatus: 'pending',
      deliveryStatus: 'pending'
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get orders by user ID
router.get('/:userId', verifyTokenAndAutherization, async (req, res) => {
  try {
    console.log("Fetching orders for user:", req.params.userId);
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: "Invalid userId format" });
    }

    const orders = await Order.find({ userId: req.params.userId }).populate('books.bookId');
    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found' });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update order status (Admin only)
router.put('/:orderId/status', verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log("Updating order status for order:", req.params.orderId);
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid orderId format" });
    }

    const { paymentStatus, deliveryStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { paymentStatus, deliveryStatus }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete order
router.delete('/:orderId', verifyTokenAndAutherization, async (req, res) => {
  try {
    console.log("Deleting order:", req.params.orderId);
    if (!mongoose.Types.ObjectId.isValid(req.params.orderId)) {
      return res.status(400).json({ message: "Invalid orderId format" });
    }

    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
