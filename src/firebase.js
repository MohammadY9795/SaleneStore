// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAegz5m7VzF0SfzIgTIWPNi-Hwe4JpP9CU",
  authDomain: "salene-412b6.firebaseapp.com",
  projectId: "salene-412b6",
  storageBucket: "salene-412b6.firebasestorage.app",
  messagingSenderId: "1097846166965",
  appId: "1:1097846166965:web:425da3ad54a1004e13b5fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);