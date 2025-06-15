import axios from 'axios';
import { APP_CONFIG} from "../../config/constants.ts";

const api = axios.create({
    baseURL: APP_CONFIG.API.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response?.status === 401) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
      }
    return Promise.reject(error);
  }
);

export default api; 