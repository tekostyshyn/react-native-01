import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../config";

export const register = createAsyncThunk(
  "auth/signup",
  async ({ inputEmail, inputPassword, inputLogin, profilePhoto }, thunkAPI) => {
    try {
      await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);

      const profileImg = await fetch(profilePhoto);
      const bytes = await profileImg.blob();
      const randomNumber = Date.now();
      const createdUrl = `profiles/${randomNumber}`;
      const profileImageRef = ref(storage, createdUrl);
      await uploadBytes(profileImageRef, bytes);
      const profileImageUrl = await getDownloadURL(ref(storage, createdUrl));

      await updateProfile(auth.currentUser, { displayName: inputLogin, photoURL: profileImageUrl });
      const { email, displayName, photoURL, uid } = auth.currentUser;
      await setDoc(doc(db, "posts", uid), {
        posts: {},
      });
      return { email, login: displayName, userId: uid, photo: photoURL };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ inputEmail, inputPassword }, thunkAPI) => {
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      const { email, displayName, photoURL, uid } = auth.currentUser;
      const profileImageUrl = await getDownloadURL(ref(storage, photoURL));
      return { email, login: displayName, userId: uid, photo: profileImageUrl };
    } catch (error) {
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await signOut(auth);
    return res;
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
