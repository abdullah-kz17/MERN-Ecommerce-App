import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../store/thunks/orderThunks';
import { clearCart, getCart } from '../store/thunks/cartThunks';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext.jsx";
import PageHero from '../components/common/Hero';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading: cartLoading } = useSelector(state => state.cart);
  const { order, loading, error } = useSelector(state => state.order);

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    country: 'Pakistan',
    phone: '',
  });

  useEffect(() => {
    if (!cart?.items?.length) {
      dispatch(getCart());
    }
  }, [cart, dispatch]);

  const handleChange = useCallback((e) => {
    setShippingInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const validateForm = () => {
    const { address, city, phone } = shippingInfo;
    if (!address || !city || !phone) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handlePlaceOrder = useCallback(() => {
    if (!cart?.items?.length) {
      alert('Your cart is empty.');
      return;
    }

    if (!validateForm()) return;

    dispatch(placeOrder({
      shippingInfo,
      paymentMethod: 'Cash on Delivery',
      cart,
    }));
  }, [cart, dispatch, shippingInfo]);

  useEffect(() => {
    if (order?._id) {
      dispatch(clearCart());
      navigate(`/order-success/${order._id}`);
    }
  }, [order, navigate]);

  return (
      <div className="dark:bg-gray-900">
        <PageHero
            title="Game On! Checkout Time."
            description="Just one step away from owning your gear. Confirm your delivery info and let's get you back on the field!"
            breadcrumbs={[
              { label: 'Cart', path: '/cart' },
              { label: 'Checkout', path: '/checkout' },
            ]}
            imageSrc="/images/checkout/sports-checkout-hero.png"
            backgroundPattern="waves"
        />

        <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-[#101114] px-4 py-10">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-xl p-8">
            <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-6">
              Checkout
            </h2>

            {cartLoading && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Loading your cart...</p>
            )}

            {/* Shipping Info */}
            <div className="space-y-5">
              <FormField label="Address" name="address" value={shippingInfo.address} onChange={handleChange} placeholder="123 Street Name" />
              <FormField label="City" name="city" value={shippingInfo.city} onChange={handleChange} placeholder="Lahore" />
              <FormField label="Phone" name="phone" value={shippingInfo.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" />
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-2">Payment Method</h3>
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
                <input type="radio" id="cod" checked readOnly />
                <label htmlFor="cod" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className={`mt-6 w-full py-3 px-6 text-white rounded-md font-semibold transition-all duration-200 text-sm ${
                    loading
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-[#0070F3] hover:bg-blue-700 dark:bg-[#00E676] dark:hover:bg-emerald-400'
                }`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>

            {error && (
                <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default Checkout;

/** 🧩 Reusable FormField Component */
const FormField = ({ label, name, value, onChange, placeholder }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0070F3] dark:focus:ring-[#00FF87] text-sm"
          required
      />
    </div>
);
