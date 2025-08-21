const Repo = require('../models/Repo');
const { createRepo, listUserRepos } = require('../utils/githubService');

// Create a new GitHub repo for user
exports.addRepo = async (req, res) => {
  const { repoName } = req.body;
  if (!repoName) return res.status(400).json({ message: 'Repository name required' });

  try {
    const githubUsername = req.user.githubUsername || 'defaultuser';
    const result = await createRepo(githubUsername,repoName);

    const repo = await Repo.create({
      user: req.user._id,
      repoName: result.repoName,
      githubUrl: result.githubUrl,
    });

    res.status(201).json(repo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get user repos
exports.getUserRepos = async (req, res) => {
  try {
    // Get repos from GitHub
    const githubRepos = await listUserRepos();

    // Optional: sync with local DB
    const localRepos = await Repo.find({ user: req.user._id });
    res.json({ githubRepos, localRepos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
