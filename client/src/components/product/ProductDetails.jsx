import React, { useState } from 'react';
import StarRating from '../common/StarRatings';
import {FaEdit, FaShoppingCart, FaTrash} from 'react-icons/fa';

const ProductDetails = ({
  product,
  comment,
  rating,
  onCommentChange,
  onRatingChange,
  onSubmitReview,
  onEditReview,
  onDeleteReview,
  editingReviewId,
  userId,
    onAddToCart
}) => {
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);

  return (
    <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-10 rounded-lg shadow space-y-10">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Images */}
        <div className="md:w-1/2">
          <img
            src={selectedImage || '/placeholder.png'}
            alt={product.name}
            loading="lazy"
            className="w-full h-80 object-contain rounded border dark:border-gray-700"
          />
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i}`}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover border rounded cursor-pointer hover:scale-105 transition-transform duration-200 ${
                  selectedImage === img ? 'ring-2 ring-blue-500' : 'dark:border-gray-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
          <div className="text-2xl font-semibold text-green-600">Rs.{product.price}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Stock: {product.stock}</div>
          <div className="text-sm text-blue-600 dark:text-blue-400">Category: {product.category}</div>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating || 0} />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              ({product.reviews?.length || 0} reviews)
            </span>

          </div>
          <button
              onClick={() => onAddToCart(product._id)}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200 flex items-center gap-2"
          >
            <FaShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded shadow-inner">
        <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
          {editingReviewId ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        <form onSubmit={onSubmitReview} className="space-y-4">
          <textarea
            value={comment}
            onChange={onCommentChange}
            placeholder="Share your thoughts..."
            className="w-full border border-gray-300 dark:border-gray-700 rounded p-3 resize-none focus:ring focus:border-blue-400 dark:bg-gray-900 dark:text-white"
            rows={4}
            required
          />
          <select
            value={rating}
            onChange={onRatingChange}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded w-full dark:bg-gray-900 dark:text-white"
            required
          >
            <option value="">Select rating</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && 's'}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            {editingReviewId ? 'Update Review' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Customer Reviews
        </h3>
        {product.reviews?.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm flex gap-4"
              >
                <img
                  src={review.user?.profilePic || "/images/avatar.jpg"}
                  alt={review.user?.username || 'User'}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                      {review.user?.username || 'Anonymous'}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{review.comment}</p>
                  {review.user?._id === userId && (
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <button
                        onClick={() => onEditReview(review)}
                        title="Edit"
                        className="hover:text-blue-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDeleteReview(review._id)}
                        title="Delete"
                        className="hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
