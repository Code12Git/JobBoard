import {  store } from '@/redux/store';
import axios from 'axios';

const BASEURL = 'http://localhost:3001/api';

export const publicInstance = axios.create({
  baseURL: BASEURL
});

export const privateInstance = axios.create({
  baseURL: BASEURL,
});

privateInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error))