import * as fb from "./firebase.config";

export const firebaseConfig = {
  apiKey: fb.REACT_APP_API_KEY,
  authDomain: fb.REACT_APP_AUTH_DOMAIN,
  databaseURL: fb.REACT_APP_DATABASE_URL,
  projectId: fb.REACT_APP_PROJECT_ID,
  storageBucket: fb.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: fb.REACT_APP_MESSAGING_SENDER_ID,
  appId: fb.REACT_APP_APP_ID,
  measurementId: fb.REACT_APP_MEASUREMENT_ID,
};
