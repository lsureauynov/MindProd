import axios, { isAxiosError } from 'axios';
import { APP_CONFIG } from '../config/constants';

// Types
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  name: string;
  surname: string;
  image_url: string;
};

export type AuthTokens = {
  access: string;
  refresh: string;
};

class AuthService {
  private static instance: AuthService;
  private refreshingPromise: Promise<AuthTokens | null> | null = null;


  private constructor() {
    axios.interceptors.request.use(config => {
      const token = this.getAccessToken();
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const response = await axios.post<AuthTokens>(`${APP_CONFIG.API.BASE_URL}/login/`, credentials);
      const tokens = response.data;
      this.setTokens(tokens);
      return tokens;
    } catch (error: unknown) {
      if (this.isAxiosErrorWithResponse(error)) {
        throw new Error(error.response?.data?.message || 'Invalid credentials');
      }
      throw new Error('Failed to login');
    }
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    try {
      await axios.post(`${APP_CONFIG.API.BASE_URL}/register/`, credentials);
    } catch (error: unknown) {
      if (this.isAxiosErrorWithResponse(error)) {
        throw new Error(error.response?.data?.message || 'Registration failed');
      }
      throw new Error('Failed to register');
    }
  }

  async refreshToken(): Promise<AuthTokens | null> {
    if (this.refreshingPromise) {
      return this.refreshingPromise;
    }

    const refresh = this.getRefreshToken();
    if (!refresh) {
      return null;
    }

    this.refreshingPromise = axios.post<AuthTokens>(`${APP_CONFIG.API.BASE_URL}/token/refresh/`, { refresh })
        .then(response => {
          const tokens = response.data;
          this.setTokens(tokens);
          return tokens;
        })
        .catch(() => {
          this.logout();
          return null;
        })
        .finally(() => {
          this.refreshingPromise = null;
        });

    return this.refreshingPromise;
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem('refresh', tokens.refresh);
  }

  private isAxiosErrorWithResponse(error: unknown): error is { response: { data?: { message?: string } } } {
    return isAxiosError(error) && !!error.response;
  }
}

export default AuthService.getInstance();
