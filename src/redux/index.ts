import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  CATEGORY_KEY,
  default as CategorySlice,
} from "./slices/category.slice";
import { MENU_KEY, default as MenuSlice } from "./slices/menu.slice";
import { PRODUCT_KEY, default as ProductSlice } from "./slices/product.slice";

const { env } = process;

const MainStore = configureStore({
  reducer: {
    [CATEGORY_KEY]: CategorySlice,
    // [LOGIN_KEY]: LoginSlice, // 登录态丢去context里面了
    [MENU_KEY]: MenuSlice,
    [PRODUCT_KEY]: ProductSlice,
  },
  devTools: env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default MainStore;
