const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById, createCompany } = require('../controllers/companyController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCompanies);
router.get('/:id', getCompanyById);

// Protected admin route
router.post('/', protect, createCompany);

module.exports = router;
