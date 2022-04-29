/**
 * product slice
 */
import { createSlice } from "@reduxjs/toolkit";

export const PRODUCT_KEY = "product";

const { reducer: ProductSlice, actions } = createSlice({
  name: PRODUCT_KEY,
  initialState: [],
  reducers: {
    saveProductList: (state, { payload }) => {
      state = payload;
    },
  },
});

export default ProductSlice;
export const { saveProductList } = actions;
