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

    private isAuthenticated(): boolean {
        return !!localStorage.getItem('access');
    }

    private handleAuthError(error: any): never {
        if (error.response?.status === 401) {
            throw new Error('Vous devez être connecté pour accéder à ces informations.');
        }
        throw error;
    }

    async getPlayerById(playerId: string): Promise<Player> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour accéder aux informations du joueur.');
        }
        
        try {
            const response = await api.get(`/players/${playerId}`);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async createPlayer(user: string, username: string, image_url: string): Promise<Player> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour créer un joueur.');
        }

        try {
            const response = await api.post(`/players/`, {
                user,
                username,
                image_url
            });
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async updatePlayer(playerId: string, updates: Partial<Player>): Promise<Player> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour modifier un joueur.');
        }

        try {
            const response = await api.put(`/players/${playerId}`, updates);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async getPlayerStats(playerId: string): Promise<{ storiesStarted: number; storiesFinished: number; storiesSurvival: number }> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour accéder aux statistiques du joueur.');
        }

        try {
            const response = await api.get(`/players/${playerId}/stats`);
            return response.data;
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async getPlayerBySession(sessionId: string): Promise<Player[]> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour accéder aux joueurs de la session.');
        }

        try {
            const response = await api.get(`/players/`, {
                params: { session: sessionId }
            });
            return response.data.results;
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async deletePlayer(playerId: string): Promise<void> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour supprimer un joueur.');
        }

        try {
            await api.delete(`/players/${playerId}`);
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async getCurrentPlayer(): Promise<Player> {
        if (!this.isAuthenticated()) {
            throw new Error('Vous devez être connecté pour accéder à vos informations de joueur.');
        }

        try {
            const response = await api.get('/players/');
            
            if (response.data.results && Array.isArray(response.data.results) && response.data.results.length > 0) {
                return response.data.results[0];
            }
            
            if (Array.isArray(response.data) && response.data.length > 0) {
                return response.data[0];
            }
            
            throw new Error('Aucun joueur trouvé pour cet utilisateur.');
        } catch (error) {
            this.handleAuthError(error);
        }
    }
}