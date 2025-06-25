const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Blog = require('../models/Blog');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json({ user, blogs });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
