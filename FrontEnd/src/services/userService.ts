import api from './api';
import type { UserProfile, UserStats } from './userTypes.ts';

export class UserService {
  private static instance: UserService;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getCurrentUser(): Promise<UserProfile> {
    try {
      const response = await api.get('/me');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await api.patch('/me/', data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await api.post('/me/password', {
        currentPassword,
        newPassword
      });
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }

  async getUserStats(): Promise<UserStats> {
    try {
      const response = await api.get('/player-stats');
      
      // Si c'est un tableau de résultats, prendre le premier
      if (response.data.results && response.data.results.length > 0) {
        const playerData = response.data.results[0];
        return playerData.stats || {
          started: 0,
          finished: 0,
          survivals: 0
        };
      }
      
      // Si c'est directement les stats
      if (response.data.stats) {
        return response.data.stats;
      }
      
      // Valeurs par défaut si pas de données
      return {
        started: 0,
        finished: 0,
        survivals: 0
      };
    } catch (error) {
      // Retourner des valeurs par défaut en cas d'erreur
      return {
        started: 0,
        finished: 0,
        survivals: 0
      };
    }
  }

  async deleteAccount(): Promise<void> {
    try {
      await api.delete('/me');
    } catch (error) {
      throw new Error('Failed to delete account');
    }
  }

}

export default UserService.getInstance(); 