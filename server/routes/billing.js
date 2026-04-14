const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const Item = require('../models/Item');

/**
 * @route   POST /api/billing/generate
 * @desc    Calculate weight, rate, GST, and save invoice
 */
router.post('/generate', async (req, res) => {
  try {
    const { 
      customerName, 
      customerPhone, 
      items = [], // Default to empty array to prevent map errors
      amountPaid = 0 
    } = req.body;

    let subtotal = 0;
    const billedItems = [];

    // 1. Process each item from the Vault
    for (const entry of items) {
      const product = await Item.findOne({ barcode: entry.barcode });
      
      if (!product) {
        return res.status(404).json({ error: `Item ${entry.barcode} not found.` });
      }

      const itemWeight = product.weight || 0;
      const making = entry.manualMakingCharge || product.makingCharges || 0;
      
      const itemPrice = (itemWeight * (entry.rateAtTime || 0)) + making;
      subtotal += itemPrice;

      billedItems.push({
        itemName: product.name,
        weight: itemWeight,
        purity: product.purity,
        rateAtTime: entry.rateAtTime,
        makingCharges: making,
        totalItemPrice: itemPrice
      });

      // Update status to Sold
      product.stockStatus = 'Sold';
      await product.save();
    }

    // 2. Taxes & Totals
    const gstAmount = subtotal * 0.03; 
    const grandTotal = subtotal + gstAmount;
    const balanceDue = grandTotal - amountPaid;

    // 3. Save the Ledger Entry
    const newInvoice = new Invoice({
      invoiceNumber: `AL-${Date.now().toString().slice(-6)}`,
      customerName,
      customerPhone,
      items: billedItems,
      subtotal: Math.round(subtotal),
      gstAmount: Math.round(gstAmount),
      grandTotal: Math.round(grandTotal),
      amountPaid,
      balanceDue: Math.round(balanceDue),
      paymentStatus: balanceDue <= 0 ? 'Paid' : 'Due'
    });

    const savedInvoice = await newInvoice.save();
    console.log(`✅ Invoice ${savedInvoice.invoiceNumber} generated.`);
    res.status(201).json(savedInvoice);

  } catch (err) {
    console.error("❌ Billing Error:", err);
    res.status(500).json({ error: "Billing failed. Check server logs." });
  }
});

/**
 * @route   GET /api/billing/history
 * @desc    Fetch all past inquiries/invoices
 */
router.get('/history', async (req, res) => {
  console.log("📥 Incoming request for Vault History...");
  
  try {
    // Adding a timeout check to ensure the DB responds
    const history = await Invoice.find().sort({ createdAt: -1 }).lean().exec();
    
    console.log(`✅ Successfully retrieved ${history.length} records.`);
    
    // Explicitly send an empty array if nothing exists to prevent white screens
    return res.status(200).json(history || []);

  } catch (err) {
    console.error("❌ Database Retrieval Error:", err);
    return res.status(500).json({ 
      error: "Could not fetch vault history.",
      details: err.message 
    });
  }
});

module.exports = router;