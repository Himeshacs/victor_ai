import { combineReducers } from "@reduxjs/toolkit";
import blogPostsReducer from "./slices/blogPostsSlice";

export const rootReducer = combineReducers({
  blogPosts: blogPostsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
