const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  suitableCrops: [String],
  soilType: [String],
  usageInstructions: String,
  
}, { timestamps: true });


module.exports = mongoose.model("Product", productSchema);
