import { ShoppingCart, Star } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const user = useSelector((state: { user: { currentUser: any } }) => state.user.currentUser);
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add items to cart');
      navigate('/signin');
      return;
    }

    try {
      const token = user.token;
      const userId = user.user._id;
      
      await axios.post(
        `http://localhost:5000/api/cart/${userId}/add`,
        {
          bookId: book._id,
          quantity: 1
        },
        {
          headers: {
            token: `Bearer ${token}`
          }
        }
      );
      
      alert('Book added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add book to cart');
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
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
            onClick={handleAddToCart}
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