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

// 1. CORS Configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://allauddin-jewellers.vercel.app"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); 
app.use(express.json()); 

// 2. Optimized MongoDB Connection (Cleaned for Node 22+)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    // REMOVED: useNewUrlParser and useUnifiedTopology (No longer supported in modern drivers)
    await mongoose.connect(process.env.MONGO_URI);
    console.log("💎 CONNECTED: Allauddin Cloud Vault is Live");
  } catch (err) {
    console.error("❌ CONNECTION ERROR:", err.message);
  }
};

// Initialize connection
connectDB();

// 3. API Routes
app.use('/api/inventory', inventoryRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

// 4. Health Check
app.get('/api/status', async (req, res) => {
  await connectDB();
  
  const state = mongoose.connection.readyState;
  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };

  res.json({ 
    status: "Online", 
    vault: statusMap[state] || "Unknown State"
  });
});

// 5. Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong in the Vault!' });
});

// 6. Conditional Server Initialization
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5050; 
  app.listen(PORT, () => {
    console.log(`🚀 Local Vault Server active on http://localhost:${PORT}`);
  });
}

module.exports = app;