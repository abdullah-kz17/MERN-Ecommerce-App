import React from 'react';

const StarRating = ({ rating = 0, max = 5 }) => {
  const percentage = Math.round((rating / max) * 100);

  return (
    <div className="relative inline-block text-yellow-400 text-lg" title={`${rating.toFixed(1)} out of ${max}`}>
      {/* Empty stars */}
      <div className="flex">
        {[...Array(max)].map((_, i) => (
          <span key={i}>☆</span>
        ))}
      </div>

      {/* Filled stars */}
      <div
        className="flex absolute top-0 left-0 overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        {[...Array(max)].map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
