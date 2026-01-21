const Order = require("../models/Order");
const Product = require("../models/Product");

exports.dashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    res.json({ totalOrders, totalProducts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
