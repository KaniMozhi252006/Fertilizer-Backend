const express = require("express");
const Order = require("../models/Order");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const order = new Order({ ...req.body, userId: req.user.id });
  await order.save();
  res.json({ message: "Order placed successfully" });
});

router.get("/my", auth, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
});

module.exports = router;
