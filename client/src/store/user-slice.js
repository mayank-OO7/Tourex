import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    login(state, { payload }) {
      state.user = payload;
      localStorage.setItem("profile", JSON.stringify(payload));
    },
    logout(state) {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
