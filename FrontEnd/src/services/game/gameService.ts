import api from '../api';
import type { Character, Clue, GameState, Dialogue } from '../../types';

// Type pour les dialogues mockés
type MockDialogues = {
  [key: string]: Dialogue;
};

// Données mockées pour le développement
const MOCK_DATA = {
  gameState: {
    id: '1',
    storyId: '1',
    userId: '1',
    unlockedClues: [] as string[],
    completedDialogues: [] as string[],
    isCompleted: false,
    accusationMade: false,
    remainingAttempts: 3,
  } as GameState,
  suspects: [
    {
      id: '1',
      name: 'Jean Dupont',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
      type: 'SUSPECT' as const,
      storyId: '1',
      description: 'Un homme d\'affaires ambitieux et charismatique, connu pour son tempérament impulsif.',
      backstory: 'Associé principal de la victime dans plusieurs projets immobiliers controversés. A été vu en train de se disputer violemment avec elle la veille du drame.'
    },
    {
      id: '2',
      name: 'Marie Martin',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      type: 'SUSPECT' as const,
      storyId: '1',
      description: 'Une comptable méticuleuse avec un sens aigu du détail et une réputation d\'intégrité.',
      backstory: 'A découvert des irrégularités dans les comptes de la société quelques jours avant le meurtre. Menacée de licenciement par la victime.'
    },
  ] as Character[],
  witnesses: [
    {
      id: '3',
      name: 'Pierre Durand',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      type: 'WITNESS' as const,
      storyId: '1',
      description: 'Un gardien de nuit consciencieux et observateur, travaillant dans l\'immeuble depuis 15 ans.',
      backstory: 'Était en service la nuit du crime et affirme avoir entendu une violente dispute suivie d\'un bruit sourd vers 23h.'
    },
    {
      id: '4',
      name: 'Sophie Bernard',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      type: 'WITNESS' as const,
      storyId: '1',
      description: 'Une voisine curieuse et attentive aux détails, passionnée de photographie.',
      backstory: 'A pris des photos de l\'immeuble ce soir-là pour son projet personnel et aurait capturé une silhouette suspecte.'
    },
  ] as Character[],
  clues: [
    {
      id: '1',
      name: 'Empreintes',
      description: 'Des empreintes digitales ont été trouvées sur la poignée de porte.',
      storyId: '1',
    },
    {
      id: '2',
      name: 'Note',
      description: 'Une note mystérieuse a été découverte dans la chambre.',
      storyId: '1',
    },
  ] as Clue[],
  dialogues: {
    '1': {
      id: '1',
      characterId: '1',
      content: ['Je n\'étais pas là ce soir-là.', 'J\'ai un alibi solide.'],
      order: 1,
    },
    '2': {
      id: '2',
      characterId: '2',
      content: ['J\'ai vu quelqu\'un rôder autour de la maison.', 'Il faisait trop sombre pour le reconnaître.'],
      order: 1,
    },
  } as MockDialogues,
};

export class GameService {
  private static instance: GameService;
  private constructor() {}

  public static getInstance(): GameService {
    if (!GameService.instance) {
      GameService.instance = new GameService();
    }
    return GameService.instance;
  }

  // En mode développement, on utilise les données mockées
  private useMockData = import.meta.env.DEV;

  async getGameState(storyId: string): Promise<GameState> {
    if (this.useMockData) {
      return { ...MOCK_DATA.gameState };
    }
    const response = await api.get(`/games/${storyId}/state`);
    return response.data;
  }

  async getSuspects(storyId: string): Promise<Character[]> {
    if (this.useMockData) {
      return [...MOCK_DATA.suspects];
    }
    const response = await api.get(`/games/${storyId}/suspects`);
    return response.data;
  }

  async getWitnesses(storyId: string): Promise<Character[]> {
    if (this.useMockData) {
      return [...MOCK_DATA.witnesses];
    }
    const response = await api.get(`/games/${storyId}/witnesses`);
    return response.data;
  }

  async getClues(storyId: string): Promise<Clue[]> {
    if (this.useMockData) {
      return [...MOCK_DATA.clues];
    }
    const response = await api.get(`/games/${storyId}/clues`);
    return response.data;
  }

  async getDialogue(storyId: string, characterId: string): Promise<Dialogue> {
    if (this.useMockData) {
      const dialogue = MOCK_DATA.dialogues[characterId];
      if (!dialogue) {
        throw new Error('Dialogue not found');
      }
      return { ...dialogue };
    }
    const response = await api.get(`/games/${storyId}/dialogues/${characterId}`);
    return response.data;
  }

  async makeAccusation(storyId: string, suspectId: string): Promise<{ correct: boolean }> {
    if (this.useMockData) {
      if (MOCK_DATA.gameState.remainingAttempts <= 0) {
        throw new Error('No remaining attempts');
      }
      
      // Décrémenter le nombre d'essais
      MOCK_DATA.gameState.remainingAttempts--;
      
      // En mode développement, on considère que le suspect 1 est le coupable
      const correct = suspectId === '1';
      if (correct) {
        MOCK_DATA.gameState.isCompleted = true;
      }
      
      // Si plus d'essais ou si correct, marquer comme terminé
      if (MOCK_DATA.gameState.remainingAttempts === 0 || correct) {
        MOCK_DATA.gameState.accusationMade = true;
      }
      
      return { correct };
    }
    const response = await api.post(`/games/${storyId}/accuse`, { suspectId });
    return response.data;
  }

  async unlockClue(storyId: string, clueId: string): Promise<void> {
    if (this.useMockData) {
      if (!MOCK_DATA.gameState.unlockedClues.includes(clueId)) {
        MOCK_DATA.gameState.unlockedClues.push(clueId);
      }
      return;
    }
    await api.post(`/games/${storyId}/clues/${clueId}/unlock`);
  }

  async completeDialogue(storyId: string, dialogueId: string): Promise<void> {
    if (this.useMockData) {
      if (!MOCK_DATA.gameState.completedDialogues.includes(dialogueId)) {
        MOCK_DATA.gameState.completedDialogues.push(dialogueId);
      }
      return;
    }
    await api.post(`/games/${storyId}/dialogues/${dialogueId}/complete`);
  }
} 