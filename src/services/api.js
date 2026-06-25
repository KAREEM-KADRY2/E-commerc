import axios from 'axios';
import i18n from '../i18n'; // Assuming i18n is exported from this file or you can get the language from localStorage.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 5000, // 5 seconds timeout to fail fast if backend is down
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // 1. Language
    const lang = localStorage.getItem('i18nextLng') || 'en';
    config.headers['Accept-Language'] = lang.split('-')[0]; // 'en' or 'ar'

    // 2. Market
    // In a real app this might be dynamic, defaulting to 'ae'
    config.headers['X-Market'] = localStorage.getItem('market') || 'ae';

    // 3. Auth Token
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Return standard envelope data
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Clear token and force logout if needed
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Optional: Redirect to login
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api;
