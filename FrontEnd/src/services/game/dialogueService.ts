import api from '../api';
import type { Dialogue } from '../../types';

export class DialogueService {
    private static instance: DialogueService;

    private constructor() {}

    public static getInstance(): DialogueService {
        if (!DialogueService.instance) {
        DialogueService.instance = new DialogueService();
        }
        return DialogueService.instance;
    }

    async getDialogueBySession(session: string): Promise<Dialogue[]> {
        try {
            const response = await api.get(`/dialogues/`, {
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

    async getDialogueById(dialogueId: string): Promise<Dialogue> {
        const response = await api.get(`/dialogues/${dialogueId}`);
        return response.data;
    }

    async createDialogue(player_question:string, character:string, player:string, session:string): Promise<Dialogue> {
        const response = await api.post(`/dialogues/`, {
            player_question: player_question,
            character: character,
            player: player,
            session: session
        });
        return response.data;
    }

    async getDialogueByCharacterSession(characterId: string, session: string): Promise<Dialogue[]> {
        try {
            const response = await api.get(`/dialogues/`, {
                params: { character: characterId, session: session }
            });
            return response.data?.results || [];
        } catch (error: any) {
            // Si c'est une erreur 404, cela signifie qu'aucun dialogue n'existe encore
            if (error.response?.status === 404) {
                return [];
            }
            // Pour les autres erreurs, les relancer
            throw error;
        }
    }

    async getDialogueByCharactersSessionOrderByDate(characterId: string, session: string): Promise<Dialogue[]> {
        try {
            const response = await api.get(`/dialogues/`, {
                params: { character: characterId, session: session, ordering: 'created_at' }
            });
            return response.data?.results || [];
        } catch (error: any) {
            // Si c'est une erreur 404, cela signifie qu'aucun dialogue n'existe encore
            if (error.response?.status === 404) {
                return [];
            }
            // Pour les autres erreurs, les relancer
            throw error;
        }
    }
}