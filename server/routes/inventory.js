const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// 1. GET ALL ITEMS (Unified for Website & Admin)
router.get('/all', async (req, res) => {
  try {
    // Fetches items that are not sold yet
    const items = await Item.find({ stockStatus: 'In Stock' }).sort({ createdAt: -1 });
    console.log(`[Cloud Vault] Dispatched ${items.length} items to Web Client.`);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Vault retrieval failed." });
  }
});

// 2. SEARCH BY BARCODE (Unified for Mobile & Billing)
// Both Mobile App and Billing logic will now use this exact route
router.get('/item/:barcode', async (req, res) => {
  try {
    const item = await Item.findOne({ barcode: req.params.barcode });
    if (!item) {
      console.log(`[Vault Search] ❌ Item ${req.params.barcode} not found.`);
      return res.status(404).json({ message: "Item not found" });
    }
    console.log(`[Vault Search] ✅ Item ${req.params.barcode} located.`);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. ADD NEW ITEM
router.post('/add', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json({ message: "Vault updated", item: savedItem });
  } catch (err) {
    res.status(400).json({ error: "Barcode must be unique." });
  }
});

module.exports = router;