// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_tHOH-CsEg4v7I_uuPWjR0xTSIJeSLbA",
  authDomain: "farm-scribe.firebaseapp.com",
  projectId: "farm-scribe",
  storageBucket: "farm-scribe.appspot.com",
  messagingSenderId: "794833373047",
  appId: "1:794833373047:web:10c780e0dbd0de1f910372",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  signInWithPopup,
  googleProvider,
  facebookProvider,
};
export default db;
