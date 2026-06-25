import api from './api';

export const authService = {
  /**
   * Login user using phone and password
   * @param {string} phone 
   * @param {string} password 
   */
  loginUser: async (phone, password) => {
    try {
      const response = await api.post('/auth/login', { phone, password });
      return response; // { code, message, data: { token, user } }
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - { name, email, phone, birth_date, password, password_confirmation }
   */
  registerUser: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response; // Requires OTP next
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  },

  /**
   * Verify OTP
   * @param {string} phone 
   * @param {string} token 
   */
  verifyOtp: async (phone, token) => {
    try {
      const response = await api.post('/auth/verify-otp', { phone, token });
      return response;
    } catch (error) {
      console.error("Verify OTP Error:", error);
      throw error;
    }
  },

  /**
   * Get user profile
   */
  getProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response;
    } catch (error) {
      console.error("Get Profile Error:", error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response;
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  },

  /**
   * Login via Google/Firebase
   */
  googleLogin: async (id_token) => {
    try {
      const response = await api.post('/auth/firebase-login', { id_token, device_name: 'Web' });
      return response;
    } catch (error) {
      console.error("Firebase Login Error:", error);
      throw error;
    }
  },

  forgotPassword: async (phone) => {
    try {
      const response = await api.post('/auth/forgot/password', { phone });
      return response;
    } catch (error) {
      console.error("Forgot Password Error:", error);
      throw error;
    }
  },

  verifyForgotOtp: async (phone, token) => {
    try {
      const response = await api.post('/auth/forgot/verify-otp', { phone, token });
      return response;
    } catch (error) {
      console.error("Verify Forgot OTP Error:", error);
      throw error;
    }
  },

  resendForgotOtp: async (phone) => {
    try {
      const response = await api.post('/auth/forgot/resend-otp', { phone });
      return response;
    } catch (error) {
      console.error("Resend Forgot OTP Error:", error);
      throw error;
    }
  },

  resetPassword: async (phone, token, password, password_confirmation) => {
    try {
      const response = await api.post('/auth/forgot/reset-password', { phone, token, password, password_confirmation });
      return response;
    } catch (error) {
      console.error("Reset Password Error:", error);
      throw error;
    }
  }
};
