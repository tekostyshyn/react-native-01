import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config";

export const getPosts = createAsyncThunk("posts/fetchAll", async (userId, thunkAPI) => {
  try {
    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    return docSnap.data();
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createPostsCollection = createAsyncThunk(
  "posts/createCollection",
  async ({ userId, userLogin }, thunkAPI) => {
    try {
      const newDoc = await setDoc(doc(db, "posts", userId), {
        name: "Some name",
        login: userLogin,
      });
      return newDoc;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
