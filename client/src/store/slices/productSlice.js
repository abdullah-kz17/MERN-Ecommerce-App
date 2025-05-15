import { createSlice } from '@reduxjs/toolkit';
import {
  createProduct, getAllProducts, getProductById,
  updateProductById, deleteProductById, searchProducts,
  reviewProduct, updateReview, deleteReview, getFeaturedProducts,
  toggleFeaturedProduct
} from '../thunks/productThunks';

const initialState = {
  products: [],
  featuredProducts: [],
  product: null,
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.products.push(payload);
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })

      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })


      .addCase(getProductById.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        state.product = payload;
      })

      .addCase(updateProductById.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        const index = state.products.findIndex(p => p._id === payload._id);
        if (index !== -1) state.products[index] = payload;
        state.success = true;
      })

      .addCase(deleteProductById.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        state.products = state.products.filter(p => p._id !== payload.id);
        state.success = true;
      })

      .addCase(searchProducts.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        const { products, total, page, pages } = payload;
        state.products = products;
        state.total = total;
        state.page = page;
        state.pages = pages;
      })

      .addCase(reviewProduct.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        state.product = payload;
        state.success = true;
      })

      .addCase(updateReview.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        state.product.reviews = payload.reviews;
        state.success = true;
      })

      .addCase(deleteReview.fulfilled, (state, { payload }) => {
        state.loading = false; // ✅ FIXED
        state.product.reviews = state.product.reviews.filter(r => r._id !== payload.reviewId);
        state.success = true;
      })

      .addCase(getFeaturedProducts.fulfilled, (state, { payload }) => {
        state.loading = false;
        const { featuredProducts, total, page, pages } = payload;
        state.featuredProducts = featuredProducts;
        state.total = total;
        state.page = page;
        state.pages = pages;
      })

      .addCase(toggleFeaturedProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === payload._id);
        if (index !== -1) {
          state.products[index].isFeatured = payload.isFeatured;
        }
      })

      // Global matchers for pending and rejected
      .addMatcher(
        (action) => action.type.startsWith('product/') && action.type.endsWith('/pending'),
        (state) => { state.loading = true; state.error = null; }
      )
      .addMatcher(
        (action) => action.type.startsWith('product/') && action.type.endsWith('/rejected'),
        (state, { payload }) => { state.loading = false; state.error = payload; }
      );
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
