const express = require("express");
const router = express.Router();
const { parser } = require("../config/cloudinary");
const Order = require("../models/Order");

// Generate Token ID
const generateToken = () => Math.floor(10000 + Math.random() * 90000);

// ✅ Upload Route
router.post("/upload", parser.array("files", 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    // Parse metadata (JSON string from frontend)
    const filesData = JSON.parse(req.body.filesData || "[]");

    // Create orders for each uploaded file
    const orders = await Promise.all(
      req.files.map((file, index) => {
        const fileMeta = filesData[index] || {};
        return Order.create({
          tokenId: generateToken(),
          filename: file.originalname,
          url: file.path, // ✅ Cloudinary file URL
          uploadedBy: req.body.userId || "Guest",
          copies: fileMeta.copies || 1,
          color: fileMeta.color || "color",
          doubleSided: fileMeta.doubleSided || false,
          pages: fileMeta.pages || 1,
          paymentId: req.body.paymentId || "N/A",
        });
      })
    );

    res.status(201).json({
      success: true,
      message: "All files uploaded successfully",
      order: orders,
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
