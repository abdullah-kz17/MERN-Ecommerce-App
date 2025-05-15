import React from 'react';

export default function ProductTable({
                                         products,
                                         handleDeleteProduct,
                                         handleToggleFeatured,
                                         actionLoading
                                     }) {
    // Mocking Link to avoid import issues
    const Link = ({ to, className, title, children }) => (
        <a href={to} className={className} title={title}>{children}</a>
    );

    // Icon components to avoid react-icons dependency
    const FaEye = () => <span role="img" aria-label="view">👁️</span>;
    const FaEdit = () => <span role="img" aria-label="edit">✏️</span>;
    const FaTrash = () => <span role="img" aria-label="delete">🗑️</span>;
    const FaBox = () => <span role="img" aria-label="products">📦</span>;

    return (
        <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                <FaBox />
                <span>All Products</span>
            </h2>

            {products.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No products found.</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Try changing your search criteria</p>
                </div>
            ) : (
                <div className="relative">
                    {actionLoading && (
                        <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center z-10">
                            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            {['#', 'Name', 'Description', 'Price', 'Featured', 'Actions'].map((head, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
                        {products.map((product, index) => (
                            <tr
                                key={product._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                            >
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{index + 1}</td>
                                <td className="px-4 py-3">
                                    <p className="font-medium text-gray-800 dark:text-white truncate max-w-xs">{product.name}</p>
                                </td>
                                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                                    {product.description
                                        ? (
                                            <p className="truncate max-w-xs">
                                                {product.description.slice(0, 60)}{product.description.length > 60 ? '...' : ''}
                                            </p>
                                        )
                                        : <span className="italic text-gray-400">No description</span>
                                    }
                                </td>
                                <td className="px-4 py-3 text-green-600 font-semibold">Rs.{product.price}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleToggleFeatured(product._id)}
                                        disabled={actionLoading}
                                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${product.isFeatured
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                                        } disabled:opacity-50`}
                                    >
                                        {product.isFeatured ? 'Featured' : 'Not Featured'}
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-4 text-lg">
                                        <Link
                                            to={`/products-detail/${product._id}`}
                                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                            title="View"
                                        >
                                            <FaEye />
                                        </Link>
                                        <Link
                                            to={`/admin/edit-product/${product._id}`}
                                            className="text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteProduct(product._id)}
                                            disabled={actionLoading}
                                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}