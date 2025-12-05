import React, { useEffect, useState } from "react";
import { mockService } from "../../services/mockService";
import { Review } from "../../types";
import { Star } from "lucide-react";

const TutorReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    mockService.getTutorReviews().then(setReviews);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
        <Star className="mr-3" /> Recent Reviews
      </h1>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between mb-2">
              <div className="font-semibold text-gray-900 dark:text-white">
                {review.studentName}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {review.date}
              </div>
            </div>
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < review.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "{review.comment}"
            </p>
          </div>
        ))}
        {reviews.length === 0 && (
          <div className="text-gray-500">No reviews yet.</div>
        )}
      </div>
    </div>
  );
};

export default TutorReviews;
