const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount, address } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: "Total amount is required" });
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
