const Problem = require('../models/Problem');

exports.getProblems = async (req, res) => {
  const problems = await Problem.find().populate('company', 'name');
  res.json(problems);
};

exports.getProblemById = async (req, res) => {
  const problem = await Problem.findById(req.params.id).populate('company', 'name');
  if (!problem) return res.status(404).json({ message: 'Problem not found' });
  res.json(problem);
};

exports.createProblem = async (req, res) => {
  const problem = await Problem.create(req.body);
  res.status(201).json(problem);
};
