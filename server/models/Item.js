const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  barcode: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ['Gold', 'Silver', 'Platinum', 'Diamond'], required: true },
  purity: { type: String, default: '22K' }, // 18K, 22K, 24K, 925
  weight: { type: Number, required: true }, // in grams
  makingCharges: { type: Number, default: 0 },
  stockStatus: { type: String, default: 'In Stock' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);