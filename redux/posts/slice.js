import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost } from "./operations";

const initialState = {
  postsArray: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (buider) => {
    buider.addCase(getPosts.fulfilled, (state, action) => {
      state.postsArray = [...action.payload];
    }).addCase(createPost.fulfilled, (state, action) => {
      state.postsArray.push(action.payload);
    });
  },
});

export const postsReducer = postsSlice.reducer;
