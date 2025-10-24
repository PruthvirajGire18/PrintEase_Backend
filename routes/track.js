const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Track order by tokenId
router.get("/:tokenId", async (req, res) => {
  try {
    const order = await Order.findOne({ tokenId: req.params.tokenId });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
