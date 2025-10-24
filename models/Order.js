const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  tokenId: { type: Number, required: true },
  filename: String,
  url: String,
  uploadedBy: String,
  copies: Number,
  color: String,
  doubleSided: Boolean,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
