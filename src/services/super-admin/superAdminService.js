import axios from 'axios';
import mockData from '@/data/super-admin/data.json';

const BACKEND_URL = ""; // e.g. "http://localhost:5000/api"

/**
 * Super Admin API Service
 * Centralizes all data fetching logic for Hubs and Stores.
 * Includes a fallback to local data.json if the backend is not configured or reachable.
 */

export const superAdminService = {
  // --- Hubs ---
  getHubs: async () => {
    if (BACKEND_URL) {
      try {
        const response = await axios.get(`${BACKEND_URL}/hubs`);
        return response.data;
      } catch (error) {
        console.warn('API call to /hubs failed, falling back to mock data', error);
      }
    }
    // Return mock data after a small simulated delay
    return new Promise((resolve) => setTimeout(() => resolve(mockData.hubs), 500));
  },

  getHubById: async (id) => {
    if (BACKEND_URL) {
      try {
        const response = await axios.get(`${BACKEND_URL}/hubs/${id}`);
        return response.data;
      } catch (error) {
        console.warn(`API call to /hubs/${id} failed, falling back to mock data`, error);
      }
    }
    return new Promise((resolve) => {
      const hub = mockData.hubs.find(item => item.id === parseInt(id));
      setTimeout(() => resolve(hub), 300);
    });
  },

  // --- Stores ---
  getStores: async () => {
    if (BACKEND_URL) {
      try {
        const response = await axios.get(`${BACKEND_URL}/stores`);
        return response.data;
      } catch (error) {
        console.warn('API call to /stores failed, falling back to mock data', error);
      }
    }
    return new Promise((resolve) => setTimeout(() => resolve(mockData.stores), 500));
  },

  getStoreById: async (id) => {
    if (BACKEND_URL) {
      try {
        const response = await axios.get(`${BACKEND_URL}/stores/${id}`);
        return response.data;
      } catch (error) {
        console.warn(`API call to /stores/${id} failed, falling back to mock data`, error);
      }
    }
    return new Promise((resolve) => {
      const store = mockData.stores.find(item => item.id === parseInt(id));
      setTimeout(() => resolve(store), 300);
    });
  }
};
