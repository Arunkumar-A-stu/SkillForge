const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  source_code: { type: String, required: true },
  language_id: { type: Number, required: true },
  status: { type: String, enum: ['Accepted', 'Wrong Answer', 'Compilation Error', 'Runtime Error'], default: 'Compilation Error' },
  stdout: { type: String },
  stderr: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
