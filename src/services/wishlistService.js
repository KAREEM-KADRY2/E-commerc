import api from './api';

export const wishlistService = {
  getFavorites: async () => {
    try {
      const response = await api.get('/favorites');
      return response.data; // Expected array of favorite items/products
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return [];
    }
  },

  addFavorite: async (productId) => {
    try {
      const response = await api.post('/favorites', { product_id: productId });
      return response.data;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  },

  removeFavorite: async (productId) => {
    try {
      const response = await api.delete(`/favorites/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  }
};
