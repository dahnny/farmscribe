import { configureStore } from "@reduxjs/toolkit";
import contractSlice from "../slices/contract-slice";
import productSlice from "../slices/product-slice";
import uiSlice from "../slices/ui-slice";
import userSlice from "../slices/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ui: uiSlice.reducer,
    contract: contractSlice.reducer,
    product: productSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
