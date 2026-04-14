const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET all products with filtering/sorting
router.get('/', async (req, res) => {
  try {
    const { category, material, sort } = req.query;
    let query = {};
    if (category) query.category = category;
    if (material) query.material = material;

    let products = Product.find(query);

    if (sort === 'low') products = products.sort({ price: 1 });
    else if (sort === 'high') products = products.sort({ price: -1 });
    else products = products.sort({ createdAt: -1 });

    const result = await products;
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;