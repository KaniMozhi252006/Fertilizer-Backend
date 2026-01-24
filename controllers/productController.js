const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addProduct = async (req, res) => {
  try {
    // Parse form data - handle both JSON and FormData
    let name, price, description, category, stock, suitableCrops, soilType, usageInstructions;
    
    if (req.body.name) {
      // FormData - values are already strings
      name = req.body.name;
      price = parseFloat(req.body.price);
      description = req.body.description || '';
      category = req.body.category || '';
      stock = parseInt(req.body.stock) || 0;
      suitableCrops = req.body.suitableCrops;
      soilType = req.body.soilType;
      usageInstructions = req.body.usageInstructions || '';
    } else {
      // JSON data
      name = req.body.name;
      price = req.body.price;
      description = req.body.description;
      category = req.body.category;
      stock = req.body.stock;
      suitableCrops = req.body.suitableCrops;
      soilType = req.body.soilType;
      usageInstructions = req.body.usageInstructions;
    }

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    // Handle image upload
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/products/${req.file.filename}`;
    }

    // Parse arrays if they're JSON strings
    let parsedSuitableCrops = [];
    if (suitableCrops) {
      if (typeof suitableCrops === 'string') {
        try {
          parsedSuitableCrops = JSON.parse(suitableCrops);
        } catch (e) {
          // If not JSON, treat as comma-separated string
          parsedSuitableCrops = suitableCrops.split(',').map(s => s.trim()).filter(s => s);
        }
      } else if (Array.isArray(suitableCrops)) {
        parsedSuitableCrops = suitableCrops;
      }
    }

    let parsedSoilType = [];
    if (soilType) {
      if (typeof soilType === 'string') {
        try {
          parsedSoilType = JSON.parse(soilType);
        } catch (e) {
          // If not JSON, treat as comma-separated string
          parsedSoilType = soilType.split(',').map(s => s.trim()).filter(s => s);
        }
      } else if (Array.isArray(soilType)) {
        parsedSoilType = soilType;
      }
    }

    const productData = {
      name,
      price,
      description,
      category,
      stock,
      suitableCrops: parsedSuitableCrops,
      soilType: parsedSoilType,
      usageInstructions
    };

    if (imagePath) {
      productData.image = imagePath;
    }

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    console.error('Add product error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Handle image upload if new image is provided
    if (req.file) {
      updateData.image = `/uploads/products/${req.file.filename}`;
      
      // Optionally delete old image file
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct && oldProduct.image) {
        const fs = require('fs');
        const path = require('path');
        const oldImagePath = path.join(__dirname, '..', oldProduct.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    // Parse arrays if they're strings
    if (updateData.suitableCrops && typeof updateData.suitableCrops === 'string') {
      updateData.suitableCrops = JSON.parse(updateData.suitableCrops);
    }
    if (updateData.soilType && typeof updateData.soilType === 'string') {
      updateData.soilType = JSON.parse(updateData.soilType);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
