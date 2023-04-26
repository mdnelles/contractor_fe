import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { firebaseConfig } from "./constants";
import { User } from "./firebase.d";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export const addUser = async (user: User) => {
  const resp = await setDoc(doc(db, "users"), user);
  console.log(resp);
  return resp;
};
