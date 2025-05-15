// src/components/AdminSidebar.js
import React from 'react';
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaChartLine, FaSignOutAlt, FaShoppingCart, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AdminSidebar() {
  const menuItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin/dashboard' },
    { label: 'Products', icon: <FaBoxOpen />, path: '/admin/products' },
    { label: 'Orders', icon: <FaShoppingCart />, path: '/admin/orders' },
    { label: 'Users', icon: <FaUsers />, path: '/admin/users' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <span>{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
