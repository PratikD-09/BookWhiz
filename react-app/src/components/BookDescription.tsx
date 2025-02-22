import  { useState ,useEffect } from 'react';
import { Star, ShoppingCart, ChevronLeft, Check } from 'lucide-react';
// import type { Book, Review } from '../types/index';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
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
  // const [book , setBook] = useState({})
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    const getBook = async()=>{
        try {
          //  const res = await axios.get(`http://localhost:5000/api/books/${id}`)
          const res = await axios.get<Book>(`http://localhost:5000/api/books/${id}`);

           setBook(res.data)
        } catch (error) {
          console.error(error);
        }
    }
    getBook()
  }, [id])
  
  
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
                // onClick={() => onAddToCart(book)}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
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

      {/* Reviews section
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
        <div className="space-y-8">
          {mockReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800 mr-2">
                      {review.userName}
                    </span>
                    {review.verified && (
                      <span className="flex items-center text-sm text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div> */}



      
    </div>
  );
}