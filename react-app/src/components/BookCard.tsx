import { ShoppingCart, Star } from 'lucide-react';
// import type { Book } from '../types';

// interface BookCardProps {
//   book: Book;
//   onAddToCart: (book: Book) => void;
//   onBookClick: (book: Book) => void;
// }
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


interface BookCardProps {
  book: Book;
}

export default function BookCard({book} : BookCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      // onClick={() => onBookClick(book)}
    >
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-600">₹{book.price}</span>
          <button
            // onClick={(e) => {
            //   e.stopPropagation();
            //   onAddToCart(book);
            // }}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}