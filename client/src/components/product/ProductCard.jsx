import React from 'react';
import { FaEye, FaShoppingCart, FaBox, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StarRating from '../common/StarRatings';

export default function ProductCard({ product, onAddToCart }) {
  const isInStock = product.stock > 0;

  return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-full max-w-sm mx-auto group">

        {/* Image Section */}
        <div className="relative h-52 bg-gray-50 flex items-center justify-center">
          <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
          />

          {/* Featured Badge */}
          {product.isFeatured && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm tracking-wide">
            FEATURED
          </span>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          {/* Price */}
          <div className="text-xl font-bold text-blue-600">
            Rs.{product.price}
            <span className="text-sm font-medium text-gray-500 ml-1">/unit</span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {product.name}
          </h3>

          {/* Location/Category */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Category: <span className="capitalize">{product.category}</span>
          </p>

          {/* Ratings */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-yellow-400">
              <StarRating rating={product.rating || 0} />
              <span className="ml-1 text-gray-600 dark:text-gray-300">
              {(product.rating || 0).toFixed(1)}
            </span>
            </div>
            <div className={isInStock ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
              {isInStock ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          {/* Meta Info Row */}
          <div className="flex justify-between mt-3 text-xs text-gray-600 dark:text-gray-400 border-t pt-3">
            <div className="flex items-center gap-1">
              <FaTags size={12} />
              <span>{product.brand || 'Generic'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaBox size={12} />
              <span>{product.stock} units</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center">
          <button
              onClick={() => onAddToCart(product._id)}
              className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200 flex items-center gap-2"
          >
            <FaShoppingCart size={14} />
            Add to Cart
          </button>

          <Link to={`/products-detail/${product._id}`}>
            <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 transition">
              <FaEye size={14} />
              View
            </button>
          </Link>
        </div>
      </div>
  );
}
