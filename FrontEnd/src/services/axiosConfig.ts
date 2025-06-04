import axios from 'axios';
import { APP_CONFIG } from '../config/constants';
import authService from './authService';

axios.defaults.baseURL = APP_CONFIG.API.BASE_URL;
axios.defaults.timeout = APP_CONFIG.API.TIMEOUT;

axios.interceptors.request.use(
  async (config) => {
    const token = authService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url?.includes('/token/refresh/')) {
        return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const tokens = await authService.refreshToken();
      
      if (tokens) {
        originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
        return axios(originalRequest);
      }
    } catch (refreshError) {
      authService.logout();
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
); 