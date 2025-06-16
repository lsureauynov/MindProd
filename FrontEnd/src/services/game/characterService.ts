import api from '../api';
import type { Character } from '../../types';

export class CharacterService {
  private static instance: CharacterService;

  private constructor() {}

  public static getInstance(): CharacterService {
    if (!CharacterService.instance) {
      CharacterService.instance = new CharacterService();
    }
    return CharacterService.instance;
  }

  async getCharactersByStory(storyId: string, type: 'SUSPECT' | 'WITNESS'): Promise<Character[]> {
    const response = await api.get(`/characters/`, {
      params: { story_id: storyId, type }
    });
    return response.data.results;
  }

  async getCharacterById(characterId: string): Promise<Character> {
    const response = await api.get(`/characters/${characterId}`);
    return response.data;
  }

  async isCharacterGuilty(characterId: string): Promise<boolean> {
    const response = await api.get(`/characters/${characterId}/`, {
        params: { is_guilty: true }
    });
    if (response.status === 404) {
      return false;
    }
    return true;
  }

  async getSuspectsByStory(storyId: string): Promise<Character[]> {
    const response = await api.get(`/characters/`, {
        params: { 'role_id': 'suspect', story: storyId }
    });
    return response.data.results;
  }

  async getWitnessesByStory(storyId: string): Promise<Character[]> {
    const response = await api.get(`/characters/`, {
        params: { 'role_id': 'witness', story: storyId }
    });
    return response.data.results;
  }
}