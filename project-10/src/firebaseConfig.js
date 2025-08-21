// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuXFx3ESzdwicNYA-NTDVM0GTl051OvYk",
  authDomain: "blinkite-api.firebaseapp.com",
  projectId: "blinkite-api",
  storageBucket: "blinkite-api.firebasestorage.app",
  messagingSenderId: "255407891434",
  appId: "1:255407891434:web:1c95353bc25828eb91c893",
  measurementId: "G-GD0H4RTG9D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
