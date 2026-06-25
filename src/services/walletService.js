import api from './api';

export const walletService = {
  getWalletBalance: async () => {
    try {
      const response = await api.get('/wallet');
      return response.data; // Expected { balance, ... }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return null;
    }
  },

  getTransactions: async () => {
    try {
      const response = await api.get('/wallet/transactions');
      return response.data; // Expected array of transactions or paginated response
    } catch (error) {
      console.error("Error fetching wallet transactions:", error);
      return [];
    }
  }
};
