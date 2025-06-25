import api from '../api';
import type { Clue, DiscoveredClue } from '../../types';

export class CluesService {
    private static instance: CluesService;

    private constructor() {}

    public static getInstance(): CluesService {
        if (!CluesService.instance) {
        CluesService.instance = new CluesService();
        }
        return CluesService.instance;
    }

    async getCluesByStories(story: string): Promise<Clue[]> {
        const response = await api.get(`/clues/`, {
        params: { story: story },
        });
        return response.data.results;
    }

    async getDiscoveredCluesBySession(session: string): Promise<DiscoveredClue[]> {
        try {
            const response = await api.get(`/discovered_clues/`, {
                params: { session: session }
            });
            return response.data?.results || [];
        } catch (error: any) {
            if (error.response?.status === 404) {
                return [];
            }
            throw error;
        }
    }

    async getClueById(clueId: string): Promise<Clue> {
        const response = await api.get(`/clues/${clueId}`);
        return response.data;
    }



}