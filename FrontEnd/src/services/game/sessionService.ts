import api from '../api';
import type { Session } from '../../types';

export class SessionService {
    private static instance: SessionService;

    private constructor() {}

    public static getInstance(): SessionService {
        if (!SessionService.instance) {
            SessionService.instance = new SessionService();
        }
        return SessionService.instance;
    }

    async getSessionById(sessionId: string): Promise<Session> {
        const response = await api.get(`/sessions/${sessionId}`);
        return response.data;
    }

    async findSessionByStoryAndPlayer(storyId: string, playerId: string): Promise<Session | null> {
        try {
            const response = await api.get(`/sessions/`, {
                params: { story: storyId, player: playerId }
            });
            
            if (response.data.results && response.data.results.length > 0) {
                // Retourner la session la plus récente
                return response.data.results[0];
            }
            
            return null;
        } catch (error) {
            // Si aucune session n'est trouvée, retourner null
            return null;
        }
    }

    async createSession(story: string, player: string): Promise<Session> {
        const response = await api.post(`/sessions/`, { 
            story, 
            player
        });
        return response.data;
    }

    async updateSessionToStatusPlaying(sessionId: string): Promise<Session> {
        // Vérification simple de la présence du token
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        
        const response = await api.patch(`/sessions/${sessionId}/mark-playing/`);
        return response.data;
    }

    async updateSessionToStatusFinished(sessionId: string): Promise<Session> {
        // Vérification simple de la présence du token
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        
        const response = await api.patch(`/sessions/${sessionId}/mark-finished/`);
        return response.data;
    }

    async loseLife(sessionId: string): Promise<Session> {
        // Vérification simple de la présence du token
        const accessToken = localStorage.getItem('access');
        if (!accessToken) {
            throw new Error('No access token found');
        }
        
        const response = await api.patch(`/sessions/${sessionId}/lost-life/`);
        return response.data;
    }

    async deleteSession(sessionId: string): Promise<void> {
        await api.delete(`/sessions/${sessionId}`);
    }
}