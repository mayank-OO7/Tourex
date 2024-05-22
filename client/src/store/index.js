import { configureStore } from "@reduxjs/toolkit";
import posts from "./post-slice";
import user from "./user-slice";
import ui from "./ui-slice";

export default configureStore({
  reducer: {
    posts: posts.reducer,
    user: user.reducer,
    ui: ui.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
