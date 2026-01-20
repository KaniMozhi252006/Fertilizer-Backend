const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/:crop", async (req, res) => {
  const crop = req.params.crop;

  const products = await Product.find({ cropType: crop });
  res.json(products);
});

module.exports = router;
