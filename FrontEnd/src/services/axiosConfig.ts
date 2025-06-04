import axios from 'axios';
import { APP_CONFIG } from '../config/constants';
import authService from './authService';

// Configuration de base
axios.defaults.baseURL = APP_CONFIG.API.BASE_URL;
axios.defaults.timeout = APP_CONFIG.API.TIMEOUT;

// Intercepteur pour les requêtes
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

// Intercepteur pour les réponses
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur n'est pas 401 ou si la requête a déjà été retentée
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      // Tenter de rafraîchir le token
      const tokens = await authService.refreshToken();
      
      if (tokens) {
        // Mettre à jour le token dans la requête originale
        originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
        // Retenter la requête originale
        return axios(originalRequest);
      }
    } catch (refreshError) {
      // En cas d'échec du refresh, déconnecter l'utilisateur
      authService.logout();
      return Promise.reject(refreshError);
    }

    return Promise.reject(error);
  }
); 