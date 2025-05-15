import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getProductById,
  reviewProduct,
  updateReview,
  deleteReview
} from '../store/thunks/productThunks';
import ProductDetails from '../components/product/ProductDetails';
import Loader from '../components/common/Loader';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import {addItemToCart} from "../store/thunks/cartThunks.js";

export default function ProductDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { product, loading, error } = useSelector((state) => state.product);

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  const resetForm = () => {
    setComment('');
    setRating(0);
    setEditingReviewId(null);
  };

  const handleReviewSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      toast.warning('Please provide both rating and comment.');
      return;
    }

    try {
      if (editingReviewId) {
        await dispatch(updateReview({
          productId: id,
          reviewId: editingReviewId,
          comment,
          rating,
        })).unwrap();
        toast.success('Review updated');
      } else {
        await dispatch(reviewProduct({
          id,
          comment,
          rating,
        })).unwrap();
        toast.success('Review submitted');
      }

      resetForm();
      dispatch(getProductById(id));
    } catch (err) {
      toast.error(err?.message || 'Review action failed');
    }
  }, [dispatch, id, rating, comment, editingReviewId]);

  const handleEdit = useCallback((review) => {
    setEditingReviewId(review._id);
    setComment(review.comment);
    setRating(review.rating);
  }, []);

  const handleDelete = useCallback(async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await dispatch(deleteReview({ productId: id, reviewId })).unwrap();
        toast.success('Review deleted');
        dispatch(getProductById(id));
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  }, [dispatch, id]);

  const handleBack = useCallback(() => {
    navigate('/products');
  }, [navigate]);


  const handleAddToCart = useCallback(async (productId) => {
    try {
      await dispatch(addItemToCart({ productId, quantity: 1 })).unwrap();
      toast.success('Item added to cart!');
    } catch (err) {
      toast.error(err || 'Failed to add to cart');
    }
  }, [dispatch]);

  if (loading) return <Loader />;

  if (error && !product) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded">
          Error: {error}
        </div>
        <button
          onClick={handleBack}
          className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <button
          onClick={handleBack}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <ProductDetails
        product={product}
        comment={comment}
        rating={rating}
        onCommentChange={(e) => setComment(e.target.value)}
        onRatingChange={(e) => setRating(Number(e.target.value))}
        onSubmitReview={handleReviewSubmit}
        onEditReview={handleEdit}
        onDeleteReview={handleDelete}
        editingReviewId={editingReviewId}
        userId={user?._id}
        onAddToCart = {handleAddToCart}
      />
    </div>
  );
}
