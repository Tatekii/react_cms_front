/**
 * menu slice
 */
import { createSlice } from "@reduxjs/toolkit";

export const MENU_KEY = "menu";
const { reducer: MenuSlice, actions } = createSlice({
  name: MENU_KEY,
  initialState: "",
  reducers: {
    saveTitle: (state, action) => {
      state = action.payload;
    },
  },
});

export default MenuSlice;
export const { saveTitle } = actions;
