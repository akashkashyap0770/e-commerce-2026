const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    productId: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true },
);

const CART = mongoose.model("cart", cartSchema);

module.exports = CART;
