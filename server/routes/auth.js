const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to protect routes (Reuse this if needed)
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, 'allauddin_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    // Create Token (valid for 24h)
    const token = jwt.sign({ id: user._id }, 'allauddin_secret_key', { expiresIn: '24h' });
    
    res.json({ 
      token, 
      user: { username: user.username, role: user.role } 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

/**
 * @route   GET /api/auth/verify
 * @desc    Verify if the current token is valid
 */
router.get('/verify', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

/* ==========================================================================
  TEMPORARY SETUP ROUTE 
  (DISABLED FOR SECURITY - Uncomment only if you need to reset the Admin)
  ==========================================================================

router.post('/setup-admin-initial', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "Admin already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new User({
      username,
      password: hashedPassword,
      role: 'admin'
    });

    await newAdmin.save();
    res.status(201).json({ msg: `Admin ${username} created successfully!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
*/

module.exports = router;