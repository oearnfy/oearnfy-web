import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgcu9lWvcHcTntXxn1WRoGY44x0mDraKA",
  authDomain: "oearnfy999.firebaseapp.com",
  projectId: "oearnfy999",
  storageBucket: "oearnfy999.firebasestorage.app",
  messagingSenderId: "683833330532",
  appId: "1:683833330532:web:b90d98f2a55236e15c4871",
  measurementId: "G-G4L3QWK1E8"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 