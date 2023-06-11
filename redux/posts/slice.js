import { createSlice } from "@reduxjs/toolkit";
import { getPosts } from "./operations";

const initialState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(getPosts.fulfilled, (state, action) => {
        // state.posts = action.payload;
      })
    //   .addCase(register.rejected, (state) => {
    //     state.isLoggedIn = false;
    //   })
    //   .addCase(login.fulfilled, (state, action) => {
    //     state.user = action.payload.user;
    //     // state.token = action.payload.token;
    //     state.isLoggedIn = true;
    //   })
    //   .addCase(login.rejected, (state) => {
    //     state.isLoggedIn = false;
    //   });
  },
});

export const postsReducer = postsSlice.reducer;
