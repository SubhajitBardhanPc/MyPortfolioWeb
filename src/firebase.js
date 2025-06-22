// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMtl5pn-nIPZt5KzgdhLZ3HCbgg1UkMtY",
  authDomain: "portfolio-app-8f323.firebaseapp.com",
  databaseURL: "https://portfolio-app-8f323-default-rtdb.firebaseio.com", // ✅ Important!
  projectId: "portfolio-app-8f323",
  storageBucket: "portfolio-app-8f323.appspot.com", // ✅ Corrected from `.firebasestorage.app`
  messagingSenderId: "811028078242",
  appId: "1:811028078242:web:3de9e9d39af3bb58af01fb",
  measurementId: "G-J3FB9ZWT6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
