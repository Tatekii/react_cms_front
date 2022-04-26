import {
  configureStore,
  createSelector,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { CATEGORY_KEY, default as CategorySlice } from "./reducers/category";
import { LOGIN_KEY, default as LoginSlice } from "./reducers/login";
import { MENU_KEY, default as MenuSlice } from "./reducers/menu";
import { PRODUCT_KEY, default as ProductSlice } from "./reducers/product";

const MainStore = configureStore({
  reducer: {
    [CATEGORY_KEY]: CategorySlice,
    [LOGIN_KEY]: LoginSlice,
    [MENU_KEY]: MenuSlice,
    [PRODUCT_KEY]: ProductSlice,
  },
  devTools: process.env !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default MainStore;
