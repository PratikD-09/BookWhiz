import  { useState ,useEffect } from 'react';
import { Star, ShoppingCart, ChevronLeft, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from './ReviewSection';
import { useSelector } from 'react-redux';
interface Book {
  _id: string; // MongoDB ID
  title: string;
  author: string;
  description?: string;
  price: number;
  category: string; // Assuming this is the ObjectId as a string
  stock: number;
  coverImage?: string;
  rating: number;
  reviews: string[]; // Array of Review ObjectId
  publisher?: string;
  publicationDate?: string; // Date in ISO format
  ISBN: string;
  createdAt: string; // Timestamp from MongoDB
  updatedAt: string;
}

export default function BookDescription() {
  const location = useLocation()
  const id=location.pathname.split("/")[2];
  const [book, setBook] = useState<Book | null>(null);
  const user = useSelector((state: { user: { currentUser: any } }) => state.user.currentUser);

  useEffect(() => {
    const getBook = async()=>{
        try {
          const res = await axios.get<Book>(`http://localhost:5000/api/books/${id}`);
           setBook(res.data)
        } catch (error) {
          console.error(error);
        }
    }
    getBook()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }

    if (!book) return;

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-10">
      {/* Back button */}
      <Link to={'/'}>
      <button
        // onClick={onBack}
        className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Back to Books
      </button>

      
      </Link>
      
      {/* Book details section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-w-3 aspect-h-4">
          <img
            src={book?.coverImage}
            alt={book?.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{book?.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{book?.author}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(6)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">{book?.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-indigo-600">{book?.price}</span>
              <button
                onClick={handleAddToCart}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-1" />
                    Add to Cart
              </button>
              <button
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ShoppingBag className="h-5 w-5 mr-1" />
                Buy
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{book?.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Publisher</h3>
              <p>{book?.publisher}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Published Date</h3>
              <p>
                {book?.publicationDate 
                  ? new Date(book.publicationDate).toLocaleDateString()
                  : "Unknown Date"}
              </p>      

              </div>
            <div>
              <h3 className="font-semibold text-gray-700">Stock</h3>
              <p>{book?.stock}</p>
            </div>
      
          </div>
        </div>
      </div>
      <ReviewSection bookId={book?._id} />

      
    </div>
  );
}