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

    async createSession(story: string, player: string): Promise<Session> {
        const response = await api.post(`/sessions/`, { story, player });
        return response.data;
    }

    async updateSessionToStatusPlaying(sessionId: string): Promise<Session> {
        const response = await api.patch(`/sessions/${sessionId}/mark-playing`)
        return response.data;
    }

    async updateSessionToStatusLost(sessionId: string): Promise<Session> {
        const response = await api.patch(`/sessions/${sessionId}/mark-lost`)
        return response.data;
    }

    async updateSessionToStatusFinished(sessionId: string): Promise<Session> {
        const response = await api.patch(`/sessions/${sessionId}/mark-playing`)
        return response.data;
    }

    async deleteSession(sessionId: string): Promise<void> {
        await api.delete(`/sessions/${sessionId}`);
    }
}