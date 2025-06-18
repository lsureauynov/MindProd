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
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user stats');
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