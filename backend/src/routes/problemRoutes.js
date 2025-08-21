const express = require('express');
const router = express.Router();
const { getProblems, getProblemById, createProblem } = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', protect, createProblem); // Admin only ideally

module.exports = router;
