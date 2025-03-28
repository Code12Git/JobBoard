import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

export const publicInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: { "Content-Type": "application/json" },
});

export const usePrivateInstance = () => {
  const { getToken } = useAuth();

  const privateInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: { 'Content-Type': 'application/json' },
  });

  privateInstance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error getting token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return privateInstance;
};
