import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBAmyeGbzcuBeqg4xOqfXcZdet7_SVWxq4",
  authDomain: "kasir-b055c.firebaseapp.com",
  projectId: "kasir-b055c",
  storageBucket: "kasir-b055c.appspot.com", // ✅ FIX
  messagingSenderId: "1054879012084",
  appId: "1:1054879012084:web:8b89666ba1fdbc73d77aa1",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // ✅ WAJIB
