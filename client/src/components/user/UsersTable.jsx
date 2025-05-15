import React from 'react';
import { FaUserAstronaut } from 'react-icons/fa';

export default function UsersTable({ users=[], onDelete, onToggleAdmin, actionLoading }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-gray-800 dark:text-white"><FaUserAstronaut /> <span>All Users</span> </h2>

      {users.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No users found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {['#', 'Username', 'Email', 'Admin', 'Actions'].map((head, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{user.username}</td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${user.isAdmin 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-600'
                    }`}>
                    {user.isAdmin ? 'Admin' : 'User'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => onToggleAdmin(user._id, !user.isAdmin)}
                      disabled={actionLoading}
                      className={`px-4 py-1 rounded text-xs font-medium transition 
                        ${user.isAdmin 
                          ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'} 
                        ${actionLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded text-xs font-medium hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
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
