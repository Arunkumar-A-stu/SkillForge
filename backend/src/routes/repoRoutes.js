const express = require('express');
const router = express.Router();
const { createRepo } = require('../utils/githubService'); // must exist
const { addRepo, getUserRepos } = require('../controllers/repoController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, addRepo);
router.get('/', protect, getUserRepos);

module.exports = router;
