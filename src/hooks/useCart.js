import { useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from '../context/AuthContext';
import { useShareContext } from '../context/ShareContext';

export const useCart = () => {
  const { isLoggedIn } = useAuth();
  const shareContext = useShareContext();
  const shareCode = shareContext?.shareCode || null;
  const [cartData, setCartData] = useState(null);
  const [cart, setCart] = useState([]); // Fallback array of items
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    if (!isLoggedIn) {
      setCart([]);
      return;
    }
    setLoading(true);
    try {
      const data = await cartService.getCart();
      if (data && data.data) {
        setCartData(data.data);
        setCart(data.data.items || []);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      // You could prompt login here or handle guest cart
      console.warn("User must be logged in to add to cart");
      return;
    }
    setLoading(true);
    try {
      await cartService.addItem(product.id, 1, null, shareCode);
      await fetchCart(); // Refresh cart
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, delta, currentQuantity) => {
    if (!isLoggedIn) return;
    const newQuantity = currentQuantity + delta;
    setLoading(true);
    try {
      if (newQuantity <= 0) {
        await cartService.removeItem(cartItemId);
      } else {
        await cartService.updateItemQuantity(cartItemId, newQuantity);
      }
      await fetchCart(); // Refresh cart
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      await cartService.removeItem(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setLoading(false);
    }
  };

  const cartTotalItems = cartData ? cartData.total_items : cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cartData ? cartData.subtotal : cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCashback = cartData ? cartData.cashback : cart.reduce((sum, item) => sum + ((item.cashback || 0) * item.quantity), 0);

  return {
    cart, // array of items
    cartData, // full cart payload
    addToCart,
    updateQuantity,
    removeFromCart,
    cartTotalItems,
    cartSubtotal,
    cartCashback,
    isCartOpen,
    setIsCartOpen,
    loading
  };
};
