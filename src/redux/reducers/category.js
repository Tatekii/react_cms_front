/**
 * category reducer
 */
import { createSlice } from "@reduxjs/toolkit";

export const CATEGORY_KEY = "category";

const { reducer: CategorySlice, actions } = createSlice({
  name: CATEGORY_KEY,
  initialState: [],
  reducers: {
    saveCategory: (state, action) => {
      state = action.payload;
    },
  },
});

export const { saveCategory } = actions;
export default CategorySlice;
