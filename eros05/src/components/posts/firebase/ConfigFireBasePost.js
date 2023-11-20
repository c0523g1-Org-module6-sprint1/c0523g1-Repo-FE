import { initializeApp } from "firebase/app";
import{getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCoLLHi4CD_TnmxQdF47xoMcj9rOJq9Bok",
  authDomain: "postimage-22ffb.firebaseapp.com",
  projectId: "postimage-22ffb",
  storageBucket: "postimage-22ffb.appspot.com",
  messagingSenderId: "520079712928",
  appId: "1:520079712928:web:b0da0436d1c6d5acb8dfc5"
};

const appPostFireBase = initializeApp(firebaseConfig,'post-app');
export const imagePostDb = getStorage(appPostFireBase)