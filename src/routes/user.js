// routes/user.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protectRoute } = require('../middleware/auth');
const User = require('../models/User');

// Set up Multer for handling file uploads (profile pictures)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter,
});

// Update user profile picture
router.post('/update-profile-picture', protectRoute, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.userId;
    const profilePicture = req.file.path;

    // Find the user and update the profile picture
    await User.findByIdAndUpdate(userId, { profilePicture });

    res.json({ message: 'Profile picture updated successfully' });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: 'Error updating profile picture' });
  }
});

// Update user name and email
router.post('/update-profile', protectRoute, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email } = req.body;

    // Find the user and update name and email
    await User.findByIdAndUpdate(userId, { name, email });

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
