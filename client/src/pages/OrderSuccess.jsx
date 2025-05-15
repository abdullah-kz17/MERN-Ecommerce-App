import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const { order } = useSelector((state) => state.order);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-10 text-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Your order ID is <span className="font-semibold">{orderId}</span>
      </p>

      {order ? (
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-lg rounded-lg p-6 w-full max-w-md mb-6">
          <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
          <p className="mb-2">
            <span className="font-medium">Total:</span> Rs. {order.totalPrice}
          </p>
          <p>
            <span className="font-medium">Shipping to:</span>{' '}
            {order.shippingInfo?.address}, {order.shippingInfo?.city}
          </p>
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Unable to load order details. Please check your orders page.
        </div>
      )}

      <Link
        to="/orders"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200"
      >
        View My Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;
