const express = require("express");
const router = express.Router();
const { parser } = require("../config/cloudinary");
const Order = require("../models/Order");

// Generate Token ID
const generateToken = () => Math.floor(10000 + Math.random() * 90000);

// ✅ Upload Route
router.post("/upload", parser.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Create new order
    const newOrder = await Order.create({
      tokenId: generateToken(),
      filename: req.file.originalname,
      url: req.file.path, // ✅ Cloudinary gives secure URL
      uploadedBy: req.body.userId || "Guest",
      copies: req.body.copies || 1,
      color: req.body.color || "color",
      doubleSided: req.body.doubleSided === "true",
    });

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message,
    });
  }
});

module.exports = router;
