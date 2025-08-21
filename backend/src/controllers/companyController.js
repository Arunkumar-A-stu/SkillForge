const Company = require('../models/Company');

// Get all companies
exports.getCompanies = async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);
  if (!company) return res.status(404).json({ message: 'Company not found' });
  res.json(company);
};

// Create new company (admin only)
exports.createCompany = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const existing = await Company.findOne({ name });
  if (existing) return res.status(400).json({ message: 'Company already exists' });

  const company = await Company.create({ name, description });
  res.status(201).json(company);
};
