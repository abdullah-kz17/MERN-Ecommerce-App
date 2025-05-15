import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminLayout from './AdminLayout';
import { FaUsers, FaBox, FaClipboardList, FaChartBar } from 'react-icons/fa';
import { getAllOrders } from '../../store/thunks/orderThunks';
import { getAllProducts } from '../../store/thunks/productThunks';
import { fetchUsers } from '../../store/thunks/userThunks';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const dispatch = useDispatch();

const { users = [] } = useSelector((state) => state.user);
const { products = [] } = useSelector((state) => state.product);
const { allOrders = [] } = useSelector((state) => state.order);


  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getAllProducts());
    dispatch(getAllOrders());
  }, [dispatch]);

  const totalUsers = users.length;
  const totalProducts = products.length;
  const totalOrders = allOrders.length;
  const totalSales = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Overview of platform activity</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          {
            title: 'Total Users',
            count: totalUsers,
            icon: <FaUsers />,
            color: 'bg-blue-600',
          },
          {
            title: 'Total Products',
            count: totalProducts,
            icon: <FaBox />,
            color: 'bg-green-600',
          },
          {
            title: 'Total Orders',
            count: totalOrders,
            icon: <FaClipboardList />,
            color: 'bg-yellow-500',
          },
          {
            title: 'Sales This Month',
            count: `Rs.${totalSales.toLocaleString()}`,
            icon: <FaChartBar />,
            color: 'bg-indigo-600',
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`${item.color} p-6 rounded-xl shadow-lg dark:shadow-none text-white flex items-center gap-4 hover:scale-[1.02] transition`}
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Orders</h3>
          <Link
            to="/admin/orders"
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {[...allOrders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <td className="px-4 py-3">{order._id.slice(-6)}</td>
                  <td className="px-4 py-3">{order.user?.username || 'Unknown'}</td>
                  <td className="px-4 py-3">Rs.{order.totalPrice}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.isDelivered ? 'bg-green-600' : 'bg-red-600'
                      } text-white`}
                    >
                      {order.isDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
