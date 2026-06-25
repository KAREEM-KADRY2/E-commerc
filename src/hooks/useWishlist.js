import { useState, useEffect } from 'react';
import { wishlistService } from '../services/wishlistService';
import { useAuth } from '../context/AuthContext';

export const useWishlist = () => {
  const { isLoggedIn } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!isLoggedIn) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const data = await wishlistService.getFavorites();
      const items = Array.isArray(data) ? data : (data?.data || []);
      setWishlist(items);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isLoggedIn]);

  const addToWishlist = async (product) => {
    if (!isLoggedIn) return; // or show toast to login
    
    // Optimistic UI update
    const prevWishlist = [...wishlist];
    if (!prevWishlist.some(item => item.id === product.id)) {
      setWishlist([...prevWishlist, product]);
    }
    
    try {
      await wishlistService.addFavorite(product.id);
      // Fetch fresh wishlist if needed:
      // await fetchWishlist();
    } catch (error) {
      console.error("Failed to add favorite", error);
      setWishlist(prevWishlist); // revert on error
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!isLoggedIn) return;
    
    const prevWishlist = [...wishlist];
    setWishlist(prevWishlist.filter(item => item.id !== productId));
    
    try {
      await wishlistService.removeFavorite(productId);
    } catch (error) {
      console.error("Failed to remove favorite", error);
      setWishlist(prevWishlist); // revert on error
    }
  };

  const toggleWishlist = async (product) => {
    if (!isLoggedIn) return;
    const existingItem = wishlist.find(item => item.id === product.id);
    if (existingItem) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const wishlistTotalItems = wishlist.length;

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    wishlistTotalItems,
    loading
  };
};
