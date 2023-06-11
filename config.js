import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyClAc_V4QDdjudpek9jL0oLGV09dzoStow",
  authDomain: "react-native-01-f5a9f.firebaseapp.com",
  databaseURL: 'https://react-native-01-f5a9f.firebaseio.com',
  projectId: "react-native-01-f5a9f",
  storageBucket: "react-native-01-f5a9f.appspot.com",
  messagingSenderId: "1032289425869",
  appId: "1:1032289425869:web:7ab6d804063f2cd73e4c84"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);