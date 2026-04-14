const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route Imports
const inventoryRoutes = require('./routes/inventory');
const billingRoutes = require('./routes/billing'); 
const customerRoutes = require('./routes/customers'); 
const authRoutes = require('./routes/auth');

const app = express();

// 1. UPDATED CORS: Allow both local testing and your live Vercel domain
app.use(cors({
  origin: ["http://localhost:5173", "https://allauddin-jewellers.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); 
app.use(express.json()); 

// 2. MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("💎 CONNECTED: Allauddin Cloud Vault is Live"))
  .catch(err => {
    console.error("❌ CONNECTION ERROR:", err);
    // On Vercel, we don't necessarily want to process.exit(1) as it's a serverless function
  });

// 3. API Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// 4. Health Check
app.get('/api/status', (req, res) => {
  res.json({ 
    status: "Online", 
    vault: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
  });
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong in the Vault!'
  });
});

// 6. Conditional Server Initialization
// This keeps it working locally, but avoids errors on Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050; 
  app.listen(PORT, () => {
    console.log(`🚀 Local Vault Server active on http://localhost:${PORT}`);
  });
}

// CRITICAL: Export for Vercel Serverless Functions
module.exports = app;