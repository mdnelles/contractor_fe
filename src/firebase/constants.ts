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
 export const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://firebase.google.com',
    // This must be true.
    handleCodeInApp: true,
    // iOS: {
    //   bundleId: 'com.example.ios'
    // },
    // android: {
    //   packageName: 'com.example.android',
    //   installApp: true,
    //   minimumVersion: '12'
    // },
    dynamicLinkDomain: 'firebase.google.com'
  };