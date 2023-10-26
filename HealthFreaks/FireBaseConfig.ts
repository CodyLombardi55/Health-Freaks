import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDlU1sOcii2WT0UauvIY8XPICA1kcT9_GY",
  authDomain: "healthfreaksapp.firebaseapp.com",
  projectId: "healthfreaksapp",
  storageBucket: "healthfreaksapp.appspot.com",
  messagingSenderId: "128335861133",
  appId: "1:128335861133:web:157b952eab7fd5e8c7d9c4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = (Platform.OS == 'android') ? initializeAuth(FIREBASE_APP, { persistence: getReactNativePersistence(AsyncStorage) }) : getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);