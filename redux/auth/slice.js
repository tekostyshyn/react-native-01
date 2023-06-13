import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout } from "./operations";

const initialState = {
  user: { login: null, email: null, userId: "", photo: "" },
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { login: null, email: null, userId: "" };
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;
