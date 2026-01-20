const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { auth, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* DASHBOARD SUMMARY */
router.get("/summary", auth, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* RECENT ORDERS */
router.get("/recent-orders", auth, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* LOW STOCK PRODUCTS */
router.get("/low-stock", auth, adminOnly, async (req, res) => {
  try {
    const products = await Product.find({ stock: { $lt: 10 } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
