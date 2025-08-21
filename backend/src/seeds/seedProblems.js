const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Problem = require('../models/Problem');
const Company = require('../models/Company');

dotenv.config();
connectDB();

const seed = async () => {
  try {
    // Clear old data
    await Problem.deleteMany();
    await Company.deleteMany();

    // Sample companies
    const google = await Company.create({ name: 'Google', description: 'Tech giant' });
    const amazon = await Company.create({ name: 'Amazon', description: 'E-commerce leader' });

    // Sample problems
    const problems = [
      {
        title: 'Two Sum',
        description: 'Find indices that add up to target',
        difficulty: 'Easy',
        company: google._id,
        tags: ['Array', 'HashMap']
      },
      {
        title: 'Merge Intervals',
        description: 'Merge overlapping intervals',
        difficulty: 'Medium',
        company: amazon._id,
        tags: ['Array', 'Sorting']
      }
    ];

    await Problem.insertMany(problems);
    console.log('Seed data inserted successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
