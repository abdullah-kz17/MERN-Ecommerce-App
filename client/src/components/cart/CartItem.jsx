import React from 'react';
import { FaTrash } from 'react-icons/fa';

export default function CartItem({ item, onUpdateQty, onRemove }) {
  const { product, quantity } = item;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      
      {/* Product Info */}
      <div className="flex items-center gap-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-20 h-20 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            Rs.{product.price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => onUpdateQty(product._id, parseInt(e.target.value))}
          className="w-16 px-3 py-1 text-center rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00FF87] transition"
        />
        <button
          onClick={() => onRemove(product._id)}
          className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
}
