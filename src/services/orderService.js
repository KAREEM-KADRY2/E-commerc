import api from './api';

export const orderService = {
  checkout: async (checkoutData) => {
    try {
      // checkoutData should contain: phone, country_id, governorate_id, city_id, address, payment_method, etc.
      const response = await api.post('/checkout', checkoutData);
      return response; // { code, message, data: { order_id, ... } }
    } catch (error) {
      console.error("Error during checkout:", error);
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      return null;
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await api.patch(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error;
    }
  }
};
