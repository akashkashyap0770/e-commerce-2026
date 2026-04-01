const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    product: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: {
      rate: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    quantity: { type: Number, default: 1 },
    priceCents: { type: Number, required: true },
  },
  { timestamps: true },
);

const PRODUCT = mongoose.model("product", productSchema);

module.exports = PRODUCT;
