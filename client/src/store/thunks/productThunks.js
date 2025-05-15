// src/store/product/productThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate, axiosPublic } from '../../utils/axiosInstance';

export const createProduct = createAsyncThunk(
  'product/create',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post('/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Create product failed');
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'product/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get('/product');
      return data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch products failed');
    }
  }
);

export const getProductById = createAsyncThunk(
  'product/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get(`/product/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Fetch product failed');
    }
  }
);

export const updateProductById = createAsyncThunk(
  'product/update',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/product/${id}`, formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

export const deleteProductById = createAsyncThunk(
  'product/delete',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.delete(`/product/${id}`);
      return { ...data, id };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

export const searchProducts = createAsyncThunk(
  'product/search',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get('/product/search', { params });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Search failed');
    }
  }
);

export const reviewProduct = createAsyncThunk(
  'product/review',
  async ({ id, comment, rating }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.post(`/product/review/${id}`, { comment, rating });
      return data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Review failed');
    }
  }
);

export const updateReview = createAsyncThunk(
  'product/updateReview',
  async ({ productId, reviewId, comment, rating }, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.put(`/product/${productId}/reviews/${reviewId}`, { comment, rating });
      return data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Update review failed');
    }
  }
);

export const deleteReview = createAsyncThunk(
  'product/deleteReview',
  async ({ productId, reviewId }, { rejectWithValue }) => {
    try {
      await axiosPrivate.delete(`/product/${productId}/reviews/${reviewId}`);
      return { productId, reviewId };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Delete review failed');
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  'product/featured',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosPublic.get('/product/featured');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Featured products fetch failed');
    }
  }
);


export const toggleFeaturedProduct = createAsyncThunk(
  'product/toggleFeatured',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axiosPrivate.patch(`product/featured/${id}`);
      return data.product;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle featured');
    }
  }
);