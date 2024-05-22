import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    setPosts(state, { payload }) {
      state.posts = payload;
    },
    createPost(state, { payload }) {
      state.posts.push(payload);
    },
    likePost(state, { payload }) {
      state.posts = state.posts.map((post) => (post._id === payload._id ? payload : post));
    },
    deletePost(state, { payload }) {
      state.posts = state.posts.filter((post) => post._id !== payload);
    },
  },
});

export const postActions = postSlice.actions;

export default postSlice;
