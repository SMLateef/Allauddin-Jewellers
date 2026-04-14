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

// 1. Enhanced Middleware (Fixes 403/CORS issues)
app.use(cors({
  origin: "http://localhost:5173", // Allow your React frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); 
app.use(express.json()); 

// 2. MongoDB Connection 
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("💎 CONNECTED: Allauddin Cloud Vault is Live"))
  .catch(err => {
    console.error("❌ CONNECTION ERROR:", err);
    process.exit(1); 
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
    vault: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    port: process.env.PORT || 5050
  });
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong in the Vault!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

// 6. Server Initialization
const PORT = process.env.PORT || 5050; 

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Vault Server active on http://localhost:${PORT}`);
});

// Catch Port 5050 conflicts (Common on macOS)
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.error(`❌ ERROR: Port ${PORT} is already in use.`);
    console.error(`👉 TIP: On macOS, go to System Settings > General > AirDrop & Handoff and turn OFF 'AirPlay Receiver'.`);
    process.exit(1);
  }
});
module.exports = app;