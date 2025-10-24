const Order = require("../models/Order");
const User = require("../models/User");

// Upload order
exports.uploadOrder = async (req, res) => {
  const { copies, color, doubleSided } = req.body;
  if (!req.file) return res.status(400).json({ error: "File required" });

  const tokenId = Math.floor(100000 + Math.random() * 900000);

  const order = await Order.create({
    tokenId,
    file: req.file.filename,
    user: req.user.id,
    copies: copies || 1,
    color: color || "color",
    doubleSided: doubleSided || false,
  });

  res.json({ message: "File uploaded", tokenId });
};

// Track order
exports.trackOrder = async (req, res) => {
  const order = await Order.findOne({ tokenId: req.params.tokenId }).populate("user", "name email");
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

// Admin: update order (paid/completed)
exports.updateOrder = async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  const order = await Order.findOne({ tokenId: req.params.tokenId });
  if (!order) return res.status(404).json({ error: "Order not found" });

  if (req.body.paid !== undefined) order.paid = req.body.paid;
  if (req.body.completed) order.status = "Completed";

  await order.save();
  res.json({ message: "Order updated", order });
};
