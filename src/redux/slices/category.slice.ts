/**
 * category reducer
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryItem } from "@/types";

export const CATEGORY_KEY = "category";

const initialCategory: CategoryItem[] = [];

const { reducer: CategorySlice, actions } = createSlice({
  name: CATEGORY_KEY,
  initialState: initialCategory,
  reducers: {
    saveCategory: (state, action: PayloadAction<CategoryItem[]>) => {
      state = [...action.payload];
      /** 曾经有一个傻逼在这里没有return说的就是我 */
      return state;
    },
  },
});

export const { saveCategory } = actions;
export default CategorySlice;
