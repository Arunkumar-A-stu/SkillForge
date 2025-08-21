const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const { submitCodeToJudge0 } = require('../utils/judgeService');

// Submit code for a problem
exports.submitCode = async (req, res) => {
  const { problemId, source_code, language_id } = req.body;

  if (!problemId || !source_code || !language_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Verify problem exists
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    // Execute code via Judge0
    const result = await submitCodeToJudge0(source_code, language_id);

    // Save submission
    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      source_code,
      language_id,
      status: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
    });

    res.status(201).json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get user submissions
exports.getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate('problem', 'title difficulty')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};
