// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAfOU1Rq_G5l_mjs3tqF5t8TSHMQc7LJY",
  authDomain: "short-url-app-86b9d.firebaseapp.com",
  projectId: "short-url-app-86b9d",
  storageBucket: "short-url-app-86b9d.appspot.com",
  messagingSenderId: "364805850987",
  appId: "1:364805850987:web:5adf15e2d758acdac16e2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);