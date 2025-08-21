const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, bio, githubUsername } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = name || user.name;
  user.bio = bio || user.bio;
  user.githubUsername = githubUsername || user.githubUsername;

  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    bio: updatedUser.bio,
    githubUsername: updatedUser.githubUsername
  });
};
