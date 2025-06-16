import axios from 'axios';
import { APP_CONFIG } from "../../config/constants.ts";

const api = axios.create({
    baseURL: APP_CONFIG.API.BASE_URL,
    timeout: APP_CONFIG.API.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Fonction pour obtenir le token d'accès
const getAccessToken = (): string | null => {
  return localStorage.getItem('access');
};

// Fonction pour obtenir le token de refresh
const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh');
};

// Fonction pour sauvegarder les tokens
const setTokens = (tokens: { access: string; refresh: string }): void => {
  localStorage.setItem('access', tokens.access);
  localStorage.setItem('refresh', tokens.refresh);
};

// Fonction pour supprimer les tokens
const clearTokens = (): void => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

// Intercepteur de requête pour ajouter le token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur de réponse pour gérer le refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ne pas essayer de refresh sur les endpoints d'auth
    if (originalRequest.url?.includes('/token/refresh/') || 
        originalRequest.url?.includes('/login/') || 
        originalRequest.url?.includes('/register/')) {
        return Promise.reject(error);
    }

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        
        if (!refreshToken) {
          clearTokens();
          // Rediriger vers login si nécessaire
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Essayer de refresh le token
        const response = await axios.post(`${APP_CONFIG.API.BASE_URL}/token/refresh/`, {
          refresh: refreshToken
        });

        const newTokens = response.data;
        setTokens(newTokens);

        // Retry la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
        return api(originalRequest);

      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        clearTokens();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Pour toute autre erreur 401 ou si retry a déjà été tenté
    if (error.response?.status === 401) {
      clearTokens();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// Fonction pour vérifier l'état de l'authentification
export const checkAuthStatus = (): { isAuthenticated: boolean; tokenInfo: any } => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  
  if (!accessToken) {
    return { isAuthenticated: false, tokenInfo: { access: null, refresh: !!refreshToken } };
  }
  
  try {
    // Décoder le token pour vérifier s'il est expiré
    const payload = JSON.parse(atob(accessToken.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    
    return { 
      isAuthenticated: !isExpired, 
      tokenInfo: { 
        access: !!accessToken, 
        refresh: !!refreshToken, 
        expired: isExpired,
        exp: new Date(payload.exp * 1000).toISOString()
      } 
    };
  } catch (error) {
    return { isAuthenticated: false, tokenInfo: { access: 'invalid', refresh: !!refreshToken } };
  }
};

export default api; 