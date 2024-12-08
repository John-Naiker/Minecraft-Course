import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser } from '../firebase/utils';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useSearchParams } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [sessionStartTime, setSessionStartTime] = useState(null);

  useEffect(() => {
    // Get timestamp from URL or localStorage, or use current time
    const urlStartTime = searchParams.get('startTime');
    const storedStartTime = localStorage.getItem('sessionStartTime');
    const startTime = urlStartTime || storedStartTime || Date.now().toString();
    
    // Store the start time
    setSessionStartTime(parseInt(startTime));
    localStorage.setItem('sessionStartTime', startTime);
  }, [searchParams]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await loginUser(username, password);
      setCurrentUser({ ...auth.currentUser, ...userData });
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (error) {
      throw error;
    }
  };

  const isAdmin = currentUser?.role === 'admin';

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    sessionStartTime
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
