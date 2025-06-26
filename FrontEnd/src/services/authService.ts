import { isAxiosError } from 'axios';
import api from './api';
import type {AuthTokens, LoginCredentials, RegisterCredentials, UserProfile} from './userTypes.ts';

class AuthService {
  private static instance: AuthService;
  private refreshingPromise: Promise<AuthTokens | null> | null = null;

  private constructor() {
    // Les intercepteurs sont maintenant gérés dans services/api/index.ts
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    try {
      const response = await api.post<AuthTokens>('/login/', credentials);
      const tokens = response.data;
      this.setTokens(tokens);
      return tokens;
    } catch (error: unknown) {
      if (this.isAxiosErrorWithResponse(error)) {
        const message = error.response?.data?.message ?? 'Invalid credentials';
        return Promise.reject(new Error(message));
      }
      return Promise.reject(new Error('Failed to login'));
    }
  }

  async register(credentials: RegisterCredentials): Promise<UserProfile> {
    try {
      const response = await api.post<{ message: string; user_id: string; access: string; refresh: string }>(
          '/register/',
          credentials
      );

      const tokens = { access: response.data.access, refresh: response.data.refresh };
      this.setTokens(tokens);

      return { id: response.data.user_id } as UserProfile;
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

    this.refreshingPromise = api.post<AuthTokens>('/token/refresh/', { refresh })
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
