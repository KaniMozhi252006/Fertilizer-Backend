const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    // Prevent admin from placing orders
    if (req.user.role === 'admin') {
      return res.status(403).json({ message: "Admins cannot place orders" });
    }

    const { products, totalAmount, address } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
    }

    if (!address || address.trim() === "") {
      return res.status(400).json({ message: "Address is required" });
    }

    const order = await Order.create({
      userId: req.user.id,
      products,
      totalAmount,
      address
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus, paymentStatus } = req.body;

    if (!deliveryStatus && !paymentStatus) {
      return res.status(400).json({ message: "At least one status must be provided" });
    }

    const updateData = {};
    if (deliveryStatus) {
      updateData.deliveryStatus = deliveryStatus;
    }
    if (paymentStatus) {
      updateData.paymentStatus = paymentStatus;
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      updateData,
      { new: true }
    ).populate("userId").populate("products.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
