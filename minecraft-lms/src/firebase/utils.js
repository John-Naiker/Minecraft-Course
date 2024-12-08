import { db, auth } from './config';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, where, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Authentication
export const loginUser = async (username, password) => {
  try {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    const userDoc = querySnapshot.docs[0];
    const userData = { id: userDoc.id, ...userDoc.data() };

    // Sign in with Firebase Auth
    const email = `${username}@rockethourtiger.com`;
    await signInWithEmailAndPassword(auth, email, password);

    // Check class access for students
    if (userData.role === 'student') {
      const hasAccess = await checkClassAccess(userData.uid);
      if (!hasAccess) {
        await signOut(auth);
        throw new Error('Class is not in session');
      }
    }

    return userData;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Login failed: ' + error.message);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed: ' + error.message);
  }
};

// Class Management
export const getAllClasses = async () => {
  const querySnapshot = await getDocs(collection(db, 'classes'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createClass = async (classData) => {
  return await addDoc(collection(db, 'classes'), classData);
};

export const updateClass = async (classId, classData) => {
  const classRef = doc(db, 'classes', classId);
  await updateDoc(classRef, classData);
};

export const deleteClass = async (classId) => {
  const classRef = doc(db, 'classes', classId);
  await deleteDoc(classRef);
};

// User Management
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const createUser = async (userData) => {
  // Create auth user
  const userCredential = await createUserWithEmailAndPassword(auth, `${userData.username}@rockethourtiger.com`, userData.password);
  
  // Create user document
  const userDoc = {
    uid: userCredential.user.uid,
    username: userData.username,
    classId: userData.classId,
    role: userData.role
  };
  
  return await addDoc(collection(db, 'users'), userDoc);
};

export const updateUser = async (userId, userData) => {
  const userRef = doc(db, 'users', userId);
  const updateData = {
    username: userData.username,
    classId: userData.classId,
    role: userData.role
  };
  
  await updateDoc(userRef, updateData);
};

export const deleteUser = async (userId) => {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
};

// Time-based Access Control
export const checkClassAccess = async (userId) => {
  try {
    // Get user's class
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('uid', '==', userId));
    const userSnapshot = await getDocs(q);
    
    if (userSnapshot.empty) {
      return false;
    }

    const userData = userSnapshot.docs[0].data();
    if (userData.role === 'admin') {
      return true;
    }

    // Get class details
    const classRef = doc(db, 'classes', userData.classId);
    const classDoc = await getDoc(classRef);
    
    if (!classDoc.exists()) {
      return false;
    }

    const classData = classDoc.data();
    const now = new Date();
    const classTime = new Date();
    const [hours, minutes] = classData.startTime.split(':');
    classTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endTime = new Date(classTime.getTime() + classData.duration * 60000);
    
    return now >= classTime && now <= endTime;
  } catch (error) {
    console.error('Error checking class access:', error);
    return false;
  }
};
