const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  const ConfessionModel = mongoose.model("confessions", ConfessionSchema);
  module.exports = ConfessionModel;