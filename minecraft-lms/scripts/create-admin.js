import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAeFe4tFNw1qI18LwwzMzjLT-OxhJ2DVA4",
  authDomain: "rockethourtiger.firebaseapp.com",
  projectId: "rockethourtiger",
  storageBucket: "rockethourtiger.firebasestorage.app",
  messagingSenderId: "226359152236",
  appId: "1:226359152236:web:b2c0ea9dcb7d540fe4d249"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const adminUser = {
  username: 'admin',
  password: 'RocketHour2024!',
  role: 'admin'
};

async function createAdminUser() {
  try {
    // Create auth user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      `${adminUser.username}@rockethourtiger.com`,
      adminUser.password
    );

    // Create user document
    const userDoc = {
      uid: userCredential.user.uid,
      username: adminUser.username,
      role: adminUser.role
    };

    await addDoc(collection(db, 'users'), userDoc);

    console.log('Admin user created successfully!');
    console.log('Username:', adminUser.username);
    console.log('Password:', adminUser.password);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
