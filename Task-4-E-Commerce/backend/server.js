const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Sample Product Inventory Data (in INR ₹)
const products = [
  { id: "1", name: "Wireless Bluetooth Headphones", price: 2999, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
  { id: "2", name: "Smart Fitness Watch", price: 4499, category: "Electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
  { id: "3", name: "Ergonomic Laptop Stand", price: 1299, category: "Accessories", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" },
  { id: "4", name: "Mechanical Gaming Keyboard", price: 3999, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300" }
];

// In-Memory Shopping Cart
let cart = [];

// GET: Fetch product catalog
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET: Fetch current cart items & total
app.get("/api/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ cart, total });
});

// POST: Add item to cart
app.post("/api/cart", (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.status(201).json({ cart, total });
});

// DELETE: Remove item from cart
app.delete("/api/cart/:id", (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== id);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  res.json({ cart, total });
});

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`E-Commerce backend running on http://localhost:${PORT}`);
});