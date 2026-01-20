const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  cropType: { type: String },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  description: { type: String },
  image: { type: String },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Product", ProductSchema);
