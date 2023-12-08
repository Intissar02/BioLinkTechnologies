import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnqze3su7c9ZReYioSsRGgcJqM8J2LqcQ",
  authDomain: "test-e9b27.firebaseapp.com",
  projectId: "test-e9b27",
  storageBucket: "test-e9b27.appspot.com",
  messagingSenderId: "837893003288",
  appId: "1:837893003288:web:b7d2f58f12dd6ad7fb0b6d",
  measurementId: "G-KMT4EHNN9L"
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIREBASE_DB = getFirestore(FIREBASE_APP)