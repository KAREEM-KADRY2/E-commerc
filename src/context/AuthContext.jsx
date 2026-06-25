import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        try {
          const res = await authService.getProfile();
          if (res.data) {
            setUser(res.data);
            setIsLoggedIn(true);
          }
        } catch (err) {
          localStorage.removeItem('auth_token');
          setIsLoggedIn(false);
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData, token) => {
    if (token) localStorage.setItem('auth_token', token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      if (isLoggedIn) {
        await authService.logout();
      }
    } catch (e) {
      console.error(e);
    } finally {
      localStorage.removeItem('auth_token');
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const openAuthModal = (intent = null) => {
    setAuthIntent(intent);
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthIntent(null);
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      login, 
      logout,
      isAuthModalOpen,
      openAuthModal,
      closeAuthModal,
      authIntent,
      setAuthIntent,
      user,
      setUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
