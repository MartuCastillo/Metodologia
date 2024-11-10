import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcd8SGKOWQK1B-d7dSd0T3Y5oqwOYRX88",
  authDomain: "ecommerce-logan-a6b63.firebaseapp.com",
  projectId: "ecommerce-logan-a6b63",
  storageBucket: "ecommerce-logan-a6b63.appspot.com",
  messagingSenderId: "742099890208",
  appId: "1:742099890208:web:d48487dbf4d0c148bdcc45",
  measurementId: "G-SZ4B6LC7V5"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };