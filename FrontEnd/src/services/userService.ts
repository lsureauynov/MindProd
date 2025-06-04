import axios from 'axios';
import { APP_CONFIG } from '../config/constants';

const API_URL = `${APP_CONFIG.API.BASE_URL}/users`;

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  image_url: string;
}

export interface UserStats {
  storiesPlayed: number;
  storiesCompleted: number;
  accuracy: number;
}

class UserService {
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
      const response = await axios.get(`${API_URL}/me`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await axios.patch(`${API_URL}/me`, data);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user profile');
    }
  }

  async updatePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/me/password`, {
        currentPassword,
        newPassword
      });
    } catch (error) {
      throw new Error('Failed to update password');
    }
  }

  /*async getUserStats(): Promise<UserStats> {
    try {
      const response = await axios.get(`${API_URL}/me/stats`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user stats');
    }
  }*/

  async deleteAccount(): Promise<void> {
    try {
      await axios.delete(`${API_URL}/me`);
    } catch (error) {
      throw new Error('Failed to delete account');
    }
  }
}

export default UserService.getInstance(); 