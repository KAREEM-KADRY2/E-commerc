import api from './api';

export const contentService = {
  getBanners: async () => {
    try {
      const response = await api.get('/content/banners');
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  },

  getSettings: async () => {
    try {
      const response = await api.get('/content/settings');
      return response.data;
    } catch (error) {
      console.error("Error fetching settings:", error);
      return null;
    }
  },

  getAbout: async () => {
    try {
      const response = await api.get('/content/about');
      return response.data;
    } catch (error) {
      console.error("Error fetching about content:", error);
      return null;
    }
  },

  getPrivacy: async () => {
    try {
      const response = await api.get('/content/privacy');
      return response.data;
    } catch (error) {
      console.error("Error fetching privacy policy:", error);
      return null;
    }
  },

  getTerms: async () => {
    try {
      const response = await api.get('/content/terms');
      return response.data;
    } catch (error) {
      console.error("Error fetching terms:", error);
      return null;
    }
  },

  getFaqs: async () => {
    try {
      const response = await api.get('/content/faq');
      return response.data;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      return [];
    }
  },

  submitContact: async (payload) => {
    try {
      const response = await api.post('/content/contact', payload);
      return response.data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      throw error;
    }
  }
};
