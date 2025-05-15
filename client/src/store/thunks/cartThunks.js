// src/store/cart/cartThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/axiosInstance';

// 1. Add or update product in cart
export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.post('/cart/create', { productId, quantity });
      return response.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 2. Get cart
export const getCart = createAsyncThunk(
  'cart/get',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.get('/cart');
      return response.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 3. Update cart quantity
export const updateCartItem = createAsyncThunk(
  'cart/updateItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.put('/cart/update', { productId, quantity });
      return response.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 4. Remove product from cart
export const removeCartItem = createAsyncThunk(
  'cart/removeItem',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosPrivate.delete(`/cart/remove/${productId}`);
      return response.data.cart;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// 5. Clear cart
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    try {
      await axiosPrivate.delete('/cart/clear');
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
