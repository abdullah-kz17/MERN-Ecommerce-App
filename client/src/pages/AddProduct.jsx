import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../store/thunks/productThunks';
import Loader from '../components/common/Loader';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductForm() {
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    subcategory: '',
    stock: '',
    brand: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  useEffect(() => {
    // Cleanup object URLs to prevent memory leaks
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        formData.images.forEach((file) => data.append('images', file));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await dispatch(createProduct({ formData: data })).unwrap();
      toast.success('✅ Product created successfully!');
      navigate('/products');
    } catch (err) {
      toast.error(err?.message || '❌ Failed to create product');
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-blue-500"><Loader /></div>;
  }

  const fields = [
    { label: 'Product Name', name: 'name', type: 'text', required: true },
    { label: 'Description', name: 'description', type: 'textarea', required: true },
    { label: 'Price', name: 'price', type: 'number', required: true },
    { label: 'Stock', name: 'stock', type: 'number', required: true },
    { label: 'Category', name: 'category', type: 'text', required: true },
    { label: 'Subcategory', name: 'subcategory', type: 'text' },
    { label: 'Brand', name: 'brand', type: 'text' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6 dark:bg-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">📦 Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map(({ label, name, type, required }) => (
          <div key={name}>
            <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                required={required}
                value={formData[name]}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <input
                type={type}
                name={name}
                required={required}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">Product Images</label>
          <input
            type="file"
            name="images"
            multiple
            required
            onChange={handleImageChange}
            className="w-full border p-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600"
          />
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-4">
              {previewImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Preview ${idx + 1}`}
                  className="h-24 w-full object-cover rounded border dark:border-gray-600"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded transition duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Creating Product...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
}
