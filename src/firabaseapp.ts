// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-d67oIXZXuuQeM_kM0gWXjUNi51haGCs",
  authDomain: "oldvibescaffe.firebaseapp.com",
  projectId: "oldvibescaffe",
  storageBucket: "oldvibescaffe.appspot.com",
  messagingSenderId: "103711601789",
  appId: "1:103711601789:web:8e66066e603bb9fbc42d14",
  measurementId: "G-NJNQLF5PY9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const db = getFirestore();


