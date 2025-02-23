

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  description: string;
  ISBN: string;       // ✅ Added
  createdAt: string;  // ✅ Added
  updatedAt: string;  // ✅ Added
}

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>("http://localhost:5000/api/books/");
        setBooks(res.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Books</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button className="p-2 rounded-full bg-white shadow-md hover:bg-gray-50">
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map((book) => (
              <Link key={book._id} to={`/books/${book._id}`}>
                <BookCard book={book} />
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No books available</p>
          )}
        </div>
      </div>
    </section>
  );
}

