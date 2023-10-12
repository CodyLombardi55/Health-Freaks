import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  /* current firebase credentials
  apiKey: "AIzaSyCMsl2G62WIrICbKKbbVDTQqAiRVwAsLIQ",
  authDomain: "newapp-ed3bb.firebaseapp.com",
  projectId: "newapp-ed3bb",
  storageBucket: "newapp-ed3bb.appspot.com",
  messagingSenderId: "27225001628",
  appId: "1:27225001628:web:5990619411ed71691e2759"
  */
  //testing firebase credentials
  apiKey: "AIzaSyDlU1sOcii2WT0UauvIY8XPICA1kcT9_GY",
  authDomain: "healthfreaksapp.firebaseapp.com",
  projectId: "healthfreaksapp",
  storageBucket: "healthfreaksapp.appspot.com",
  messagingSenderId: "128335861133",
  appId: "1:128335861133:web:157b952eab7fd5e8c7d9c4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);