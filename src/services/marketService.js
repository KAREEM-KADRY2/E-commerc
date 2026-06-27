import api from './api';

export const marketService = {
  getCurrentMarket: async () => {
    try {
      const response = await api.get('/markets/current');
      return response.data; // { currency_symbol, min_order, tax_mode, etc. }
    } catch (error) {
      console.error("Error fetching current market:", error);
      return null;
    }
  }
};
