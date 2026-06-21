import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState(null);
  
  const [user, setUser] = useState({
    fullName: 'كريم قدري',
    phone: '+966 50 123 4567',
    email: 'kareem1203@gmail.com',
    address: 'Riyadh, Saudi Arabia'
  });

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

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
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
