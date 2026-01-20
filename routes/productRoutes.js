const express = require("express");
const Product = require("../models/Product");
const { auth, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/* ADD PRODUCT */
router.post("/", auth, adminOnly, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json({ message: "Product added successfully" });
});

/* UPDATE PRODUCT */
router.put("/:id", auth, adminOnly, async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Product updated successfully" });
});

/* DELETE PRODUCT */
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted successfully" });
});

/* VIEW ALL PRODUCTS (PUBLIC) */
router.get("/", async (req, res) => {
  const products = await Product.find({ isActive: true });
  res.json(products);
});

module.exports = router;
