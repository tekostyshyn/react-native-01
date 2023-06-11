import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "./operations";

const initialState = {
  user: { login: null, email: null, userId: "" },
  isLoggedIn: false,
  isRegistered: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (buider) => {
    buider
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isRegistered = true;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isRegistered = false;
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRegistered = false;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.isRegistered = false;
      });
  },
});

export const authReducer = authSlice.reducer;
