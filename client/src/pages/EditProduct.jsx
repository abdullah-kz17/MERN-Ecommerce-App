import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductById,
  updateProductById,
} from '../store/thunks/productThunks';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, loading, error } = useSelector((state) => state.product);

  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: '',
    brand: '',
  });

  // Fetch product on mount
  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch]);

  // Populate form when product data arrives
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        subcategory: product.subcategory || '',
        stock: product.stock || '',
        brand: product.brand || '',
      });
    }
  }, [product]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Submit update
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!formData.name || !formData.price || !formData.stock) {
        toast.warning('Name, Price and Stock are required fields');
        return;
      }

      try {
        await dispatch(updateProductById({ id, formData })).unwrap();
        toast.success('Product updated successfully!');
        navigate('/products');
      } catch (err) {
        console.error(err);
        toast.error(err?.message || 'Failed to update product');
      }
    },
    [dispatch, id, formData, navigate]
  );

  if (loading) return <div className="text-center py-10 text-blue-500"><Loader /></div>;

  if (error)
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;

  const fields = [
    { label: 'Product Name', name: 'name', type: 'text', required: true },
    { label: 'Price', name: 'price', type: 'number', required: true },
    { label: 'Category', name: 'category', type: 'text' },
    { label: 'Subcategory', name: 'subcategory', type: 'text' },
    { label: 'Stock', name: 'stock', type: 'number', required: true },
    { label: 'Brand', name: 'brand', type: 'text' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">✏️ Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {fields.map(({ label, name, type, required }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required={required}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          ))}

          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
