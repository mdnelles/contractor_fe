// Import the functions you need from the SDKs you need
//require("dotenv").config();
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  sendSignInLinkToEmail,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

import {
  LoginEmailPwdProps,
  RegisterWithEmailPasswordProps,
} from "./firebase.d";
import { actionCodeSettings, firebaseConfig } from "./constants";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

const logInWithEmailAndPassword = async (props: LoginEmailPwdProps) => {
  const { email, password } = props;
  try {
    const resp: any = await signInWithEmailAndPassword(auth, email, password);
    return resp;
  } catch (err: any) {
    console.error(err);
    return err.message;
  }
};

const registerWithEmailAndPassword = async (email:string,password:string) => {

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const user = res.user;

    const userObj = {
      uid: res.user.uid,
      emailVarified: false,
      authProvider: "firebase",
      email,
      createdAt: Date.now(),
    };

    const resp = await addDoc(collection(db, "users"), userObj);
    sendSignInLinkToEmail(auth, email, actionCodeSettings)

  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};
interface SendPasswordResetProps {
  email: string | any;
}

const sendPasswordReset = async (props: SendPasswordResetProps) => {
  const { email } = props;
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        emailVerified: true,
        createdAt: Date.now(),
      });
    }
    return res;
  } catch (err: any) {
    console.error(err);
    alert(err.message);
    return false;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
