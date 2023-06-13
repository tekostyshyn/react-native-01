import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from "../../config";

export const getPosts = createAsyncThunk("posts/fetchAll", async (userId, thunkAPI) => {
  try {
    const docRef = doc(db, "posts", userId);
    const docSnap = await getDoc(docRef);
    const allPosts = docSnap.data().posts;
    if (allPosts.length > 0) {
      for (post of allPosts) {
        const url = await getDownloadURL(ref(storage, post.imageUrl));
        post.imageUrl = url;
      }
      return allPosts;
    }
    return null;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ userId, newPost }, thunkAPI) => {
    try {
      const img = await fetch(newPost.imageUrl);
      const bytes = await img.blob();
      const randomNumber = Date.now();
      const createdUrl = `posts/${randomNumber}`;
      const postImageRef = ref(storage, createdUrl);
      await uploadBytes(postImageRef, bytes);
      const url = await getDownloadURL(ref(storage, createdUrl));
      const docRef = doc(db, "posts", userId);
      await updateDoc(docRef, {
        posts: arrayUnion({ ...newPost, imageUrl: url }),
      });
      return { ...newPost, imageUrl: url };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
