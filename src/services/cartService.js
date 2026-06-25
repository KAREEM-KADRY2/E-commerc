import api from './api';

export const cartService = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  },

  addItem: async (productId, quantity = 1, variantId = null, shareCode = null) => {
    try {
      const payload = { product_id: productId, quantity };
      if (variantId) payload.product_variant_id = variantId;
      if (shareCode) payload.share_code = shareCode;
      const response = await api.post('/cart/items', payload);
      return response.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  },

  updateItemQuantity: async (cartItemId, quantity) => {
    try {
      const response = await api.put(`/cart/items/${cartItemId}`, { quantity });
      return response.data;
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  },

  removeItem: async (cartItemId) => {
    try {
      const response = await api.delete(`/cart/items/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing cart item:", error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await api.delete('/cart');
      return response.data;
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  }
};
