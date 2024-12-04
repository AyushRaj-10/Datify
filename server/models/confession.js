const mongoose = require('mongoose');

// Define Confession Schema
const ConfessionSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create the model based on the schema
const ConfessionModel = mongoose.model('Confession', ConfessionSchema);

module.exports = ConfessionModel;
