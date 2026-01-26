import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const ReviewCard = ({ review, active }) => {
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300
      ${active ? "bg-white shadow-xl scale-100" : "bg-gray-100 scale-90 opacity-50"}`}
    >
      {/* Quote Icon */}
      <div className="text-4xl text-[#CAEB66] mb-4">
        <FaQuoteLeft />
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-6">
        {review.review}
      </p>

      <hr className="border-dashed border-gray-300 mb-4" />

      {/* User Info */}
      <div className="flex items-center gap-3">
        <img
          src={review.user_photoURL}
          alt={review.userName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-[#03373D]">{review.userName}</h4>
          <p className="text-xs text-gray-500">Rating: {review.ratings} ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
