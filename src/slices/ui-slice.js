import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: { isLoading: false,  notification: null },
  reducers: {
    toggle(state) {
      state.isLoading = !state.isLoading;
    },
    setNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
