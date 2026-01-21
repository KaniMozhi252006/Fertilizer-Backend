const Product = require("../models/Product");

exports.recommend = async (req, res) => {
  try {
    const { crop, soil } = req.body;

    if (!crop || !soil) {
      return res.status(400).json({ message: "Crop and soil type are required" });
    }

    const products = await Product.find({
      suitableCrops: crop,
      soilType: soil
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
