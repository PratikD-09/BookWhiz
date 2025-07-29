const express = require('express');
const router = express.Router();
const Book = require('../Models/Book');
const { verifyToken, verifyTokenAndAutherization, verifyTokenAndAdmin } = require('./verifyToken');

// Create a new book
router.post('/', verifyTokenAndAdmin , async (req, res) => {
  try {
    let {
      title,
    author,
    price,
    description,
    genre,
    publishedDate,
    isbn,
    language,
    pages,
    } = req.body;

    // Check if a book with the same ISBN already exists
    const existingBook = await Book.findOne({isbn});

    if (existingBook) {
      return res.status(400).json({ message: 'A book with this ISBN already exists' });
      
    }

    const newBook = new Book({
    title,
    author,
    price,
    description,
    genre,
    publishedDate,
    isbn,
    language,
    pages,
    });


    await newBook.save();
    res.status(201).json({ message: 'Book created successfully', book: newBook });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "userId", select: "name" }, // Populate user details from User model
      });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


// Update a book
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a book
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
