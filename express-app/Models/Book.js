const mongoose = require('mongoose');

// models/Book.js
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  stock: { type: Number, default: 0 },
  coverImage: { type: String },
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  publisher: { type: String },
  publicationDate: { type: Date },
  ISBN: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);