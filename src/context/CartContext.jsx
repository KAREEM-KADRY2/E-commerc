import React, { createContext, useContext } from 'react';
import { useCart as useCartHook } from '../hooks/useCart';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const cartState = useCartHook();
  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};
