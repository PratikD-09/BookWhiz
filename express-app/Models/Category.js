const mongoose = require('mongoose');

// models/Category.js
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);