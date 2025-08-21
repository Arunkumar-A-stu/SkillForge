const mongoose = require('mongoose');

const repoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  repoName: { type: String, required: true },
  githubUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Repo', repoSchema);
