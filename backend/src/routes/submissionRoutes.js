const express = require('express');
const router = express.Router();
const { submitCode, getSubmissions } = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

// Create a new submission
router.post('/', protect, submitCode);

// Get all submissions for logged-in user
router.get('/', protect, getSubmissions);

module.exports = router;
