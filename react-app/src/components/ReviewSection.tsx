import { useEffect, useState } from "react";
import { Check, Star } from "lucide-react";


interface Review {
  _id: string;
  userId?: { username: string };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewSectionProps {
  bookId?: string; // Allow bookId to be undefined
}


const ReviewSection: React.FC<ReviewSectionProps> = ({ bookId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!bookId) return; // Prevent fetching if bookId is undefined
  
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${bookId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data: Review[] = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchReviews();
  }, [bookId]);
  

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review this book!</p>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-800 mr-2">
                      {review.userId?.username || "Anonymous"}
                    </span>
                    <span className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      Verified Purchase
                    </span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
