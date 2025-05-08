import { initializeApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "dietbite-d5a02.firebaseapp.com",
  projectId: "dietbite-d5a02",
  storageBucket: "dietbite-d5a02.firebasestorage.app",
  messagingSenderId: "1067924614193",
  appId: "1:1067924614193:web:1dde810a7d9d1a240ab910",
  measurementId: "G-FBSPTLYV0D",
};

const app = initializeApp(firebaseConfig);

export const auth = Platform.OS === 'web' ? getAuth(app) : initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});