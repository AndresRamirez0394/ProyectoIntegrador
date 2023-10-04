// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYa2ZsYhQvf9gerM114ZzwS6Uime6ou5E",
  authDomain: "tecnexcus.firebaseapp.com",
  projectId: "tecnexcus",
  storageBucket: "tecnexcus.appspot.com",
  messagingSenderId: "471611478953",
  appId: "1:471611478953:web:09ebee0e2a12b06488aab8",
  measurementId: "G-Q2NVQRMNP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


const analytics = getAnalytics(app);