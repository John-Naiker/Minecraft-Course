import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAeFe4tFNw1qI18LwwzMzjLT-OxhJ2DVA4",
  authDomain: "rockethourtiger.firebaseapp.com",
  projectId: "rockethourtiger",
  storageBucket: "rockethourtiger.firebasestorage.app",
  messagingSenderId: "226359152236",
  appId: "1:226359152236:web:b2c0ea9dcb7d540fe4d249"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
