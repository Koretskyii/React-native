import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace this with your actual firebaseConfig from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCx_uXpdrekmfsTgkepCQWjOT7ocmlWcwM",
  authDomain: "base-app-b16b6.firebaseapp.com",
  projectId: "base-app-b16b6",
  storageBucket: "base-app-b16b6.firebasestorage.app",
  messagingSenderId: "535048764264",
  appId: "1:535048764264:web:a7303d6d41565b1f5674dd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
