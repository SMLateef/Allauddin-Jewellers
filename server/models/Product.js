const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  material: { type: String, enum: ['Gold', 'Silver', 'Diamond', 'Platinum'] },
  images: [String],
  stock: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);