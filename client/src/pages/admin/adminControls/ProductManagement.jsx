import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductById,
  searchProducts,
  toggleFeaturedProduct,
} from '../../../store/thunks/productThunks';

import ProductTable from '../../../components/product/ProductTable';
import Pagination from '../../../components/common/Pagination';
import Loader from '../../../components/common/Loader';
import AdminLayout from '../AdminLayout';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../../customHooks/useDebounce';

export default function ProductManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, total, loading, error } = useSelector((state) => state.product);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProducts = useCallback(() => {
    dispatch(
        searchProducts({
          keyword: debouncedKeyword,
          page: page + 1, // API expects 1-based indexing
          limit: rowsPerPage,
        })
    );
  }, [dispatch, debouncedKeyword, page, rowsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleFeatured = async (id) => {
    setActionLoading(true);
    try {
      await dispatch(toggleFeaturedProduct(id));
      await fetchProducts();
    } catch (error) {
      console.error('Error toggling featured status:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    setActionLoading(true);
    try {
      await dispatch(deleteProductById({ id }));
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    setPage(0); // Reset to first page when searching
  };

  const handleAddProduct = () => navigate('/admin/add-product');

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
      <AdminLayout className="p-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Product Management</h1>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                    type="text"
                    value={keyword}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded w-full pl-10
                  focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <button
                  onClick={handleAddProduct}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap
                transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader />
            </div>
        ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md">
              <p className="text-red-500 dark:text-red-400 text-center">Error: {error}</p>
            </div>
        ) : (
            <>
              <ProductTable
                  products={products}
                  handleDeleteProduct={handleDeleteProduct}
                  handleToggleFeatured={handleToggleFeatured}
                  actionLoading={actionLoading}
              />

              <Pagination
                  currentPage={page}
                  totalItems={total}
                  itemsPerPage={rowsPerPage}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={(val) => {
                    setRowsPerPage(val);
                    setPage(0);
                  }}
              />
            </>
        )}
      </AdminLayout>
  );
}