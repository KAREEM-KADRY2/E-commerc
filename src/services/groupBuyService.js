import api from './api';

export const groupBuyService = {
  getMyGroupBuys: async () => {
    try {
      const response = await api.get('/group-buys/mine');
      return response.data;
    } catch (error) {
      console.error("Error fetching my group buys:", error);
      return [];
    }
  },

  getGroupBuyById: async (id) => {
    try {
      const response = await api.get(`/group-buys/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching group buy:", error);
      return null;
    }
  },

  createGroupBuy: async (payload) => {
    try {
      const response = await api.post('/group-buys', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating group buy:", error);
      throw error;
    }
  },

  publishGroupBuy: async (id) => {
    try {
      const response = await api.post(`/group-buys/${id}/publish`);
      return response.data;
    } catch (error) {
      console.error("Error publishing group buy:", error);
      throw error;
    }
  },

  getGroupByInviteCode: async (code) => {
    try {
      const response = await api.get(`/group-buys/invite/${code}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching group by invite code:", error);
      throw error;
    }
  },

  joinGroupByInviteCode: async (code) => {
    try {
      const response = await api.post(`/group-buys/invite/${code}/join`);
      return response.data;
    } catch (error) {
      console.error("Error joining group by invite code:", error);
      throw error;
    }
  }
};
