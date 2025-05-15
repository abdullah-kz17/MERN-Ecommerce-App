import React from 'react';
import { Link } from 'react-router-dom';

export default function CartSummary({ cartItems = [], totalPrice, onClearCart }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg dark:shadow-md border border-gray-200 dark:border-gray-700 transition-all space-y-6 max-w-md w-full">

      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🛒 Cart Summary</h2>

      {/* Product List */}
      <div className="max-h-64 overflow-y-auto pr-2 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No items in the cart.</p>
        ) : (
          cartItems.map(({ product, quantity }) => (
            <div
              key={product._id}
              className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{product.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Qty: {quantity}
                </p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                Rs.{(product.price * quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Total + Actions */}
      <div className="border-t pt-4 border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex justify-between text-lg font-semibold text-gray-800 dark:text-gray-100">
          <span>Total:</span>
          <span className="text-green-600 dark:text-green-400">Rs.{totalPrice.toFixed(2)}</span>
        </div>

        <button
          onClick={onClearCart}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold transition"
        >
          Clear Cart
        </button>

        <Link to="/checkout" className="block">
          <button className="w-full bg-[#00FF87] hover:bg-[#00e676] text-black font-bold py-2 px-4 rounded-md transition duration-200 shadow-md hover:shadow-lg">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
