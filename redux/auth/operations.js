import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config";

export const register = createAsyncThunk(
  "auth/signup",
  async ({ email, password, login }, thunkAPI) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = { email: res.user.email, login, userId: res.user.uid };
      return newUser;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async ({ email, password }, thunkAPI) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = { email: res.user.email, userId: res.user.uid };
    return user;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
