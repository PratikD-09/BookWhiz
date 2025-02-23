const express = require("express");
const router = express.Router();
const Review = require("../Models/Review");
const Book = require("../Models/Book");
const { verifyToken } = require("./verifyToken"); // Only authenticated users can add reviews

// ➤ Create a new review
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;

    // Check if required fields are provided
    if (!userId || !bookId || !rating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the user already reviewed the book
    const existingReview = await Review.findOne({ userId, bookId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this book" });
    }

    // Create and save the review
    const newReview = new Review({ userId, bookId, rating, comment });
    await newReview.save();

    // Add the review to the Book model
    await Book.findByIdAndUpdate(bookId, { $push: { reviews: newReview._id } });

    res.status(201).json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Get all reviews for a book
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .populate("userId", "username") // Populate user name
      .sort({ createdAt: -1 }); // Sort by latest reviews

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Update a review (Only the user who created it can update)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    // Ensure only the review owner can update it
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Delete a review (Only the user or an admin can delete)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    // Ensure only the review owner or admin can delete
    if (review.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized to delete this review" });
    }

    // Remove review from book
    await Book.findByIdAndUpdate(review.bookId, { $pull: { reviews: review._id } });

    // Delete review
    await review.deleteOne();

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
