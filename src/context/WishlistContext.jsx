import React, { createContext, useContext } from 'react';
import { useWishlist as useWishlistHook } from '../hooks/useWishlist';

const WishlistContext = createContext();

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const wishlistState = useWishlistHook();
  return (
    <WishlistContext.Provider value={wishlistState}>
      {children}
    </WishlistContext.Provider>
  );
};
