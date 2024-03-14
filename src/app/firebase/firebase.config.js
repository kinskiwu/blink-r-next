// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC__FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC__FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC__FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC__FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC__FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC__FIREBASE_APP_ID
};

// Initialize Firebase
// special setup for SSR
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);