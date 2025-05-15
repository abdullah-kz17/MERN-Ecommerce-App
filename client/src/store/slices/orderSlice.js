// src/store/order/orderSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus, deleteOrder,
} from '../thunks/orderThunks';

const initialState = {
  myOrders: [],
  allOrders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderLocally: (state, action) => {
      const updatedOrder = action.payload;
      const index = state.allOrders.findIndex(o => o._id === updatedOrder._id);
      if (index !== -1) {
        state.allOrders[index] = updatedOrder;
      }
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(placeOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload;
          state.error = null;
        })
        .addCase(getMyOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.myOrders = action.payload;
          state.error = null;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
          state.loading = false;
          state.allOrders = action.payload;
          state.error = null;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
          state.loading = false;
          state.order = action.payload;
          const index = state.allOrders.findIndex(o => o._id === action.payload._id);
          if (index !== -1) {
            state.allOrders[index] = action.payload;
          }
          state.error = null;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
          state.loading = false;
          state.myOrders = state.myOrders.filter(o => o._id !== action.payload);
          state.allOrders = state.allOrders.filter(o => o._id !== action.payload);
          state.error = null;
        })

        .addMatcher(
            (action) => action.type.startsWith('order/') && action.type.endsWith('/pending'),
            (state) => {
              state.loading = true;
              state.error = null;
            }
        )
        .addMatcher(
            (action) => action.type.startsWith('order/') && action.type.endsWith('/rejected'),
            (state, action) => {
              state.loading = false;
              state.error = action.payload;
            }
        );
  }

});

export const { updateOrderLocally } = orderSlice.actions;
export default orderSlice.reducer;
