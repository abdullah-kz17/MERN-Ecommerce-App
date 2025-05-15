import React from 'react';
import moment from 'moment';
import { FaClipboardList  } from 'react-icons/fa';

export default function OrderTable({ orders, onStatusUpdate }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className=" flex items-center gap-2 text-2xl font-bold mb-6 text-gray-800 dark:text-white"><FaClipboardList /><span>All Orders</span></h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No orders found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {['#', 'User', 'Total', 'Paid', 'Delivered', 'Placed On', 'Actions'].map((title, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {order.user?.username || 'Unknown'}
                </td>
                <td className="px-4 py-3 text-green-600 font-semibold">Rs.{order.totalPrice}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {order.isDelivered ? 'Delivered' : 'Not Delivered'}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {moment(order.createdAt).format('DD MMM YYYY')}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {!order.isPaid && (
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600 transition"
                        onClick={() =>
                          onStatusUpdate(order._id, {
                            isPaid: true,
                            isDelivered: order.isDelivered,
                          })
                        }
                      >
                        Mark Paid
                      </button>
                    )}
                    {!order.isDelivered && (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition"
                        onClick={() =>
                          onStatusUpdate(order._id, {
                            isDelivered: true,
                            isPaid: order.isPaid,
                          })
                        }
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
