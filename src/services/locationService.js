import api from './api';

export const locationService = {
  getCountries: async () => {
    try {
      const response = await api.get('/locations/countries');
      return response.data;
    } catch (error) {
      console.error("Error fetching countries:", error);
      return [];
    }
  },

  getGovernorates: async (countryId) => {
    try {
      const response = await api.get(`/locations/governorates/${countryId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching governorates:", error);
      return [];
    }
  },

  getCities: async (governorateId) => {
    try {
      const response = await api.get(`/locations/cities/${governorateId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }
};
