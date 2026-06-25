import api from './api';

export const couponService = {
  validateCoupon: async (code) => {
    try {
      const response = await api.post('/coupons/validate', { code });
      return response.data; // Should return { discount_amount, ... }
    } catch (error) {
      console.error("Error validating coupon:", error);
      throw error;
    }
  }
};
