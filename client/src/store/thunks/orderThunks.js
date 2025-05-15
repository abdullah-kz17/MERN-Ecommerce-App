// src/store/order/orderThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosPrivate } from '../../utils/axiosInstance';

// Place order
export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async ({ shippingInfo, paymentMethod }, { getState, rejectWithValue }) => {
    try {
      const cartState = getState().cart;

      if (!cartState.cart || !cartState.cart.items || cartState.cart.items.length === 0) {
        return rejectWithValue('Cart is empty or not loaded');
      }

      const res = await axiosPrivate.post('/order/create', {
        items: cartState.cart.items,
        totalPrice: cartState.cart.totalPrice,
        shippingInfo,
        paymentMethod,
      });

      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get user's orders
export const getMyOrders = createAsyncThunk(
  'order/getMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.get('/order/my-orders');
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get all orders (admin)
export const getAllOrders = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.get('/order/all-orders');
      return res.data.orders;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update order status (admin)
export const updateOrderStatus = createAsyncThunk(
  'order/updateOrderStatus',
  async ({ id, isPaid, isDelivered }, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.put(`/order/update-order/${id}`, {
        isPaid,
        isDelivered,
      });
      return res.data.order;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete order
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async ( id , { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.delete(`/order/delete-order/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
