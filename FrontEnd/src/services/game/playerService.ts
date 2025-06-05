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

    async createPlayer(name: string, surname: string, email: string, image_url: string): Promise<Player> {
        const response = await api.post(`/players/`, {
            name,
            surname,
            email,
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
}