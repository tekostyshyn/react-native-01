import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../config";

export const getPosts = createAsyncThunk("posts/fetchAll", async (userId, thunkAPI) => {
  try {
    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);
    const allPosts = docSnap.data().posts;
    return allPosts;
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
        login: userLogin,
        posts: {},
      });
      return newDoc;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
