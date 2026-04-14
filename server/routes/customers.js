const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

// Find customer history and total balance by Phone Number
router.get('/ledger/:phone', async (req, res) => {
  try {
    const invoices = await Invoice.find({ customerPhone: req.params.phone }).sort({ createdAt: -1 });

    if (invoices.length === 0) {
      return res.status(404).json({ message: "No customer records found." });
    }

    // Sum up all balanceDue fields across all their historical invoices
    const totalOutstanding = invoices.reduce((sum, inv) => sum + inv.balanceDue, 0);

    res.json({
      name: invoices[0].customerName,
      phone: req.params.phone,
      totalOutstanding,
      transactionCount: invoices.length,
      history: invoices
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;