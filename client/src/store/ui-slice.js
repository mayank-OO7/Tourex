import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { notification: { open: false, type: "success", message: "" } },
  reducers: {
    showNotification(state, { payload }) {
      state.notification.open = true;
      state.notification.type = payload.type;
      state.notification.message = payload.message;
    },
    closeNotification(state, { payload }) {
      state.notification.open = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
