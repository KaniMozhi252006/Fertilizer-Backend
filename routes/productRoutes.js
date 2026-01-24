const router = require("express").Router();
const express = require("express");
const path = require("path");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");
const ctrl = require("../controllers/productController");

router.get("/", ctrl.getProducts);

// Serve uploaded images
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

router.post("/", auth, admin, upload.single("image"), ctrl.addProduct);

router.put("/:id", auth, admin, upload.single("image"), ctrl.updateProduct);
router.delete("/:id", auth, admin, ctrl.deleteProduct);

module.exports = router;
