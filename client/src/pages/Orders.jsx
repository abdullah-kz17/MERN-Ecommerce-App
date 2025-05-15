import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders, deleteOrder } from '../store/thunks/orderThunks';
import Loader from '../components/common/Loader';
import { FaBoxOpen, FaCheckCircle, FaClock, FaTrashAlt } from 'react-icons/fa';
import OrderItems from "../components/order/OrderItems.jsx";
import { toast } from "react-toastify";
import PageHero from '../components/common/Hero.jsx'; // ✅ Hero component

const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders, loading, error } = useSelector(state => state.order);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const toggleDetails = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setIsDeleting(orderId);
      try {
        await dispatch(deleteOrder(orderId));
        toast.success('Order has been deleted!');
      } catch (error) {
        toast.error(error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
      <div className="min-h-screen dark:bg-gray-900">
        {/* ✅ Hero Section */}
        <PageHero
            title="Your Orders"
            description="Track, manage, and review your sports gear purchases."
            imageSrc="/images/orders/order-history.png"
            backgroundPattern="waves"
            breadcrumbs={[
              { label: 'Home', path: '/' },
              { label: 'Orders', path: '/orders' },
            ]}
        />

        <div className="container mx-auto px-4 py-10 text-gray-800 dark:text-gray-100">
          <h2 className="text-3xl font-bold mb-8 text-center text-black dark:text-white">
            My Orders
          </h2>

          {loading ? (
              <div className="flex justify-center mt-10"><Loader /></div>
          ) : error ? (
              <p className="text-red-500 text-center mt-10">Error: {error}</p>
          ) : myOrders.length === 0 ? (
              <div className="text-center text-gray-600 dark:text-gray-400">
                <p>You haven’t placed any orders yet.</p>
              </div>
          ) : (
              <div className="space-y-6">
                {myOrders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 transition-all hover:shadow-lg"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          {order.isDelivered ? (
                              <FaCheckCircle className="text-green-500" size={20} />
                          ) : (
                              <FaClock className="text-yellow-500" size={20} />
                          )}
                          <div>
                            <h4 className="font-semibold text-lg">
                              Order <span className="text-blue-600 dark:text-blue-400">#{order._id.slice(-6)}</span>
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Placed on {new Date(order.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                            </p>
                          </div>
                        </div>

                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                            order.isDelivered
                                ? 'bg-green-100 text-green-700 dark:bg-green-200/10 dark:text-green-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-200/10 dark:text-yellow-400'
                        }`}>
                    {order.isDelivered ? 'Delivered' : 'Pending'}
                  </span>
                      </div>

                      <div className="flex justify-between items-center text-sm mb-3">
                        <span><strong>Items:</strong> {order.items.length}</span>
                        <span><strong>Total:</strong> Rs.{order.totalPrice.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <button
                            onClick={() => toggleDetails(order._id)}
                            className="text-blue-600 hover:underline text-sm"
                        >
                          {expandedOrderId === order._id ? 'Hide Details' : 'View Items'}
                        </button>

                        <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                            disabled={isDeleting === order._id}
                        >
                          <FaTrashAlt />
                          {isDeleting === order._id ? 'Deleting...' : 'Delete Order'}
                        </button>
                      </div>

                      {expandedOrderId === order._id && <OrderItems items={order.items} />}
                    </div>
                ))}
              </div>
          )}
        </div>
      </div>
  );
};

export default Orders;
