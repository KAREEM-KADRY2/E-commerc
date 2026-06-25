import api from './api';

export const productShareService = {
  getProductShareConfig: async () => {
    try {
      const response = await api.get('/product-share/config');
      return response.data;
    } catch (error) {
      console.error("Error fetching product share config:", error);
      throw error;
    }
  },

  resolveShareByCode: async (shareCode) => {
    try {
      const response = await api.get(`/share/${shareCode}`);
      return response.data;
    } catch (error) {
      console.error("Error resolving share by code:", error);
      throw error;
    }
  },

  createProductShare: async (productId) => {
    try {
      const response = await api.post(`/products/${productId}/share`);
      return response.data;
    } catch (error) {
      console.error("Error creating product share:", error);
      throw error;
    }
  },

  listMyProductShares: async (params = { per_page: 15 }) => {
    try {
      const response = await api.get('/me/product-shares', { params });
      return response.data;
    } catch (error) {
      console.error("Error listing my product shares:", error);
      throw error;
    }
  }
};
