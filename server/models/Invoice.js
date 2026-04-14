const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true, required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  items: [{
    barcode: String, // Added for precise tracking
    itemName: String,
    weight: Number,
    purity: String,
    rateAtTime: Number,
    makingCharges: Number,
    totalItemPrice: Number
  }],
  subtotal: Number,
  gstAmount: Number, 
  grandTotal: Number,
  amountPaid: { type: Number, default: 0 },
  balanceDue: { type: Number, default: 0 }, 
  // Enum updated to include specific methods you requested
  paymentMethod: { 
    type: String, 
    enum: ['Cash', 'Card', 'UPI', 'Gold Exchange', 'Debit', 'Credit'], 
    default: 'Cash' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);