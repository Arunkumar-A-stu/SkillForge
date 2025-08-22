const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const companyRoutes = require('./routes/companyRoutes');
const repoRoutes = require('./routes/repoRoutes');
const userRoutes = require('./routes/userRoutes');



dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/repos', repoRoutes);
app.use('/api/user', userRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
