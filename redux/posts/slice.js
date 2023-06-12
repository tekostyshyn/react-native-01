import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./operations";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (buider) => {
    buider.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export const postsReducer = postsSlice.reducer;
