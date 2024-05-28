const express = require('express');
const authMiddleware = require('../middleware/auth');
const Product = require('../models/Product');

const router = express.Router();

// Add product (admin only)
router.post('/add', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Access denied' });
  }

  const { name, description, price } = req.body;
  try {
    const product = new Product({ name, description, price });
    await product.save();
    res.status(201).send({ message: 'Product added successfully' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Get all products (accessible to all users)
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
