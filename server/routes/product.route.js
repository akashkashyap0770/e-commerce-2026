const express = require("express");
const axios = require("axios");
const CART = require("../models/cart.model");
const checkAuth = require("../middlewares/auth.middleware");

const router = express.Router();

// GET all products
router.get("/products", async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");
    res.json(response.data.products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// GET cart items (protected)
router.get("/cart", checkAuth, async (req, res) => {
  try {
    const cartItem = await CART.find({ userId: req.user.userId });
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// POST add to cart (protected)
router.post("/cart", checkAuth, async (req, res) => {
  try {
    const { productId, title, price, image } = req.body;

    const userId = req.user.userId;

    // Agar already cart mein hai toh quantity badhao
    const existing = await CART.findOne({ userId, productId });
    if (existing) {
      existing.quantity = existing.quantity + 1;
      await existing.save();
      return res.json({ message: "Quantity updated", item: existing });
    }

    const newItem = await CART.create({
      userId,
      productId,
      title,
      price,
      image,
    });
    res.status(201).json({ message: "Added to cart", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// PATCH — quantity update
router.patch("/cart/:id", checkAuth, async (req, res) => {
  try {
    const { type } = req.body;

    const item = await CART.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    if (type === "increase") {
      item.quantity = item.quantity + 1;
    } else if (type === "decrease") {
      if (item.quantity === 1) {
        // Quantity 1 se kam ho toh item delete kar do
        await CART.findByIdAndDelete(req.params.id);
        return res.json({ message: "Item removed" });
      }
      item.quantity = item.quantity - 1;
    }
    await item.save();
    res.json({ message: "Quantity updated", item });
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity" });
  }
});

// DELETE cart item (protected)
router.delete("/cart/:id", checkAuth, async (req, res) => {
  try {
    await CART.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
});

module.exports = router;
