import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts, fetchProductById } from './productAPI';
const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null,
};
export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
      const response = await fetchAllProducts();
      console.log("response.data::",response.data);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );


  export const fetchProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
      const response = await fetchProductById(id);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      clearSelectedProduct:(state)=>{
        state.selectedProduct = null
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllProductsAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.products = action.payload;
        })


        .addCase(fetchProductByIdAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.selectedProduct = action.payload;
          })
    },
  });

export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductListStatus = (state) => state.product.status;



export default productSlice.reducer;