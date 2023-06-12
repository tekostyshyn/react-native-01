import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config";

export const register = createAsyncThunk(
  "auth/signup",
  async ({ inputEmail, inputPassword, inputLogin }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
      await updateProfile(auth.currentUser, { displayName: inputLogin });
      const { email, displayName, uid } = auth.currentUser;
      await setDoc(doc(db, "posts", uid), {
        posts: {},
      });
      return { email, login: displayName, userId: uid };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ inputEmail, inputPassword }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      const { email, displayName, uid } = auth.currentUser;
      return { email, login: displayName, userId: uid };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await signOut(auth);
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});
