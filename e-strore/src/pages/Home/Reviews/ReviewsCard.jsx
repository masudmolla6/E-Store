import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

const ReviewsCard = ({ review }) => {
  // Helper function to extract rating value safely
  const getRatingValue = (rating) => {
    if (!rating) return 0;
    if (typeof rating === "number") return rating;
    if (rating.$numberDouble) return parseFloat(rating.$numberDouble);
    return 0;
  };

  const ratingValue = getRatingValue(review.rating);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={review.user?.image || "/placeholder.png"}
          alt={review.user?.name || "User"}
          className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 mr-4"
        />
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {review.user?.name || "Anonymous"}
            </h3>
            {review.user?.verifiedPurchase && (
              <CheckCircle2
                size={16}
                className="text-green-500"
                title="Verified Purchase"
              />
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {review.user?.profession || ""}
          </p>
        </div>
      </div>

      {/* Review Title & Comment */}
      <h4 className="text-base italic font-medium text-gray-800 dark:text-gray-200 mb-2">
        “{review.title || "No Title"}”
      </h4>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
        {review.comment || "No comment provided."}
      </p>

      {/* Rating */}
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={18}
            className={
              i < Math.round(ratingValue)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300 dark:text-gray-600"
            }
          />
        ))}
        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
          {ratingValue.toFixed(1)} ★
        </span>
      </div>
    </div>
  );
};

export default ReviewsCard;
