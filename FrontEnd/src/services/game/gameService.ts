import api from '../api';
import type { Character, Clue, Session, Dialogue } from '../../types';

export class GameService {
  private static instance: GameService;
  private constructor() {}

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  async getGameState(storyId: string): Promise<Session> {
    const response = await api.get(`/sessions/${storyId}`);
    return response.data;
  }

  async getSuspects(storyId: string): Promise<Character[]> {
    const response = await api.get(`/characters/`, {
      params: { story_id: storyId, type: 'SUSPECT' }
    });
    return response.data.results;
  }

  async getWitnesses(storyId: string): Promise<Character[]> {
    const response = await api.get(`/characters/`, {
      params: { story_id: storyId, type: 'WITNESS' }
    });
    return response.data.results;
  }

  async getClues(storyId: string): Promise<Clue[]> {
    const response = await api.get(`/clues/`, {
      params: { story_id: storyId }
    });
    return response.data.results;
  }

  async getDialogue(storyId: string, characterId: string): Promise<Dialogue> {
    const response = await api.get(`/dialogues/`, {
      params: { story_id: storyId, character_id: characterId }
    });
    return response.data.results;
  }

  async makeAccusation(storyId: string, suspectId: string): Promise<{ correct: boolean }> {
    const response = await api.post(`/accusations/`, {
      session_id: storyId,
      character_id: suspectId
    });
    return {
      correct: response.data.results.is_correct
    };
  }

  async unlockClue(storyId: string, clueId: string): Promise<void> {
    await api.post(`/discovered-clues/`, {
      session_id: storyId,
      clue_id: clueId
    });
  }

  async completeDialogue(storyId: string, dialogueId: string): Promise<void> {
    await api.post(`/dialogues/${dialogueId}/complete/`, {
      session_id: storyId
    });
  }

  async getStories(): Promise<any[]> {
    const response = await api.get('/stories/');
    return response.data.results;
  }

  async getStoryById(storyId: string): Promise<any> {
    const response = await api.get(`/stories/${storyId}/`);
    return response.data;
  }

  async startNewSession(storyId: string): Promise<Session> {
    const response = await api.post('/sessions/', {
      story_id: storyId
    });
    return response.data.results;
  }

  async getCharacterAttributes(characterId: string): Promise<any[]> {
    const response = await api.get(`/character-attributes/`, {
      params: { character_id: characterId }
    });
    return response.data.results;
  }

  async getCharactersRevealingClue(clueId: string): Promise<any[]> {
    const response = await api.get(`/characters-reveal-clue/`, {
      params: { clue_id: clueId }
    });
    return response.data.results;
  }

  async createSession(player: string, story:string): Promise<Session> {
    const response = await api.post('/sessions/', {
      ended_at: null,
      status:'playing',
      remaining_lives: 3,
      player: player,
      story: story
    });
    return response.data.results;
  }

} 