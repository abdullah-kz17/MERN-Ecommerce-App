import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from '../store/thunks/cartThunks';
import CartItem from '../components/cart/CartItem.jsx';
import CartSummary from '../components/cart/CartSummary.jsx';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/common/Hero';

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleUpdateQty = useCallback((productId, quantity) => {
    if (quantity < 1) {
      toast.warning('Quantity must be at least 1');
      return;
    }
    dispatch(updateCartItem({ productId, quantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((productId) => {
    dispatch(removeCartItem(productId));
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
    toast.success("Cart Cleared Successfully");
  }, [dispatch]);

  const handleContinueShopping = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
      <div className="dark:bg-gray-900">
        {/* Hero Section */}
        <PageHero
            title="Your Cart"
            description="Review your selected sports gear before checkout. Get ready to play with top-quality equipment!"
            breadcrumbs={[
              { label: 'Cart', path: '/cart' },
            ]}
            imageSrc="/images/cart/sports-cart-hero.png"
            backgroundPattern="waves"
        />

        <div className="container mx-auto px-4 py-12 text-gray-800 dark:text-gray-100">
          <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-black dark:text-white">
            Your Shopping Cart
          </h1>

          {loading ? (
              <div className="text-center text-gray-500 dark:text-gray-400">
                <Loader />
              </div>
          ) : cart?.items?.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  {cart.items.map((item) => (
                      <CartItem
                          key={item.product._id}
                          item={item}
                          onUpdateQty={handleUpdateQty}
                          onRemove={handleRemoveItem}
                      />
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
                  <CartSummary
                      cartItems={cart.items}
                      totalPrice={cart.totalPrice}
                      onClearCart={handleClearCart}
                  />
                </div>
              </div>
          ) : (
              <div className="text-center py-20 text-gray-600 dark:text-gray-400">
                <p className="text-2xl font-semibold mb-6">Your cart is empty.</p>
                <button
                    onClick={handleContinueShopping}
                    className="bg-[#00E676] dark:hover:bg-emerald-400 text-black font-semibold px-6 py-3 rounded-md shadow-md transition hover:shadow-lg"
                >
                  Start Shopping
                </button>
              </div>
          )}
        </div>
      </div>
  );
}
