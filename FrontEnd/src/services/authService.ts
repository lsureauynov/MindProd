import axios from 'axios';
import { APP_CONFIG } from '../config/constants';

const API_URL = `${APP_CONFIG.API.BASE_URL}/auth`;

// Types
export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = LoginCredentials & {
  name: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// Mock JWT Token Generator
const generateMockJWT = (payload: any, expiresIn: number = 3600): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresIn;

  const tokenPayload = {
    ...payload,
    iat: now,
    exp
  };

  // Encode en base64
  const base64Header = btoa(JSON.stringify(header));
  const base64Payload = btoa(JSON.stringify(tokenPayload));
  const mockSignature = 'mock_signature';

  return `${base64Header}.${base64Payload}.${mockSignature}`;
};

class AuthService {
  private static instance: AuthService;
  private refreshTokenTimeout?: NodeJS.Timeout;

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Vérifier les credentials (mock)
    if (credentials.email === 'test@test.com' && credentials.password === 'test123') {
      const mockTokens = {
        accessToken: generateMockJWT({ 
          email: credentials.email,
          role: 'user'
        }, 3600), // 1 heure
        refreshToken: generateMockJWT({
          email: credentials.email,
          tokenType: 'refresh'
        }, 86400) // 24 heures
      };

      this.setTokens(mockTokens);
      this.startRefreshTokenTimer();
      return mockTokens;
    }

    throw new Error('Invalid credentials');
  }

  async register(credentials: RegisterCredentials): Promise<AuthTokens> {
    // Simuler un délai de réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockTokens = {
      accessToken: generateMockJWT({ 
        email: credentials.email,
        name: credentials.name,
        role: 'user'
      }, 3600),
      refreshToken: generateMockJWT({
        email: credentials.email,
        tokenType: 'refresh'
      }, 86400)
    };

    this.setTokens(mockTokens);
    this.startRefreshTokenTimer();
    return mockTokens;
  }

  async refreshToken(): Promise<AuthTokens | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      // Simuler un délai de réseau
      await new Promise(resolve => setTimeout(resolve, 200));

      // Décoder le refresh token pour obtenir l'email (dans un vrai système, ceci serait vérifié côté serveur)
      const [, payloadBase64] = refreshToken.split('.');
      const payload = JSON.parse(atob(payloadBase64));

      const mockTokens = {
        accessToken: generateMockJWT({ 
          email: payload.email,
          role: 'user'
        }, 3600),
        refreshToken: generateMockJWT({
          email: payload.email,
          tokenType: 'refresh'
        }, 86400)
      };

      this.setTokens(mockTokens);
      this.startRefreshTokenTimer();
      return mockTokens;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.stopRefreshTokenTimer();
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private startRefreshTokenTimer(): void {
    const accessToken = this.getAccessToken();
    if (!accessToken) return;

    const [, payloadBase64] = accessToken.split('.');
    const jwtToken = JSON.parse(atob(payloadBase64));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - (60 * 1000); // Refresh 1 minute avant expiration

    this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
  }

  private stopRefreshTokenTimer(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }
}

export default AuthService.getInstance(); 