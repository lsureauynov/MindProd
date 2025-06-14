import api from '../api';
import type { Player } from '../../types';

export class PlayerService {
    private static instance: PlayerService;

    private constructor() {}

    public static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    async getPlayerById(playerId: string): Promise<Player> {
        const response = await api.get(`/players/${playerId}`);
        return response.data;
    }

    async createPlayer(user: string, username: string, image_url: string): Promise<Player> {
        const response = await api.post(`/players/`, {
            user,
            username,
            image_url
        });
        return response.data;
    }

    async updatePlayer(playerId: string, updates: Partial<Player>): Promise<Player> {
        const response = await api.put(`/players/${playerId}`, updates);
        return response.data;
    }

    async getPlayerStats(playerId: string): Promise<{ storiesStarted: number; storiesFinished: number; storiesSurvival: number }> {
        const response = await api.get(`/players/${playerId}/stats`);
        return response.data;
    }

    async getPlayerBySession(sessionId: string): Promise<Player[]> {
        const response = await api.get(`/players/`, {
            params: { session: sessionId }
        });
        return response.data.results;
    }

    async deletePlayer(playerId: string): Promise<void> {
        await api.delete(`/players/${playerId}`);
    }

    async getCurrentPlayer() {
        const response = await api.get('/players/');
        if (Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0];
        }
        throw new Error('Aucun joueur trouvé pour cet utilisateur.');
    }
}