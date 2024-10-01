// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Si usas Firestore, o puedes usar Auth, Storage, etc.

const firebaseConfig = {
    apiKey: "AIzaSyCCUF29HXYJSW9uP9BtbeosC-Sp131_RgI",
    authDomain: "neam-68a97.firebaseapp.com",
    projectId: "neam-68a97",
    storageBucket: "neam-68a97.appspot.com",
    messagingSenderId: "972864631507",
    appId: "1:972864631507:web:db48c6b04bf14d54645a26",
    measurementId: "G-YSGV8EC7LQ"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
