import api from '../api';
import type { Accusation } from '../../types';

export class AccusationService {
  private static instance: AccusationService;

  private constructor() {}

  public static getInstance(): AccusationService {
    if (!AccusationService.instance) {
      AccusationService.instance = new AccusationService();
    }
    return AccusationService.instance;
  }

  async createAccusation(session: string, suspectId: string): Promise<Accusation> {
    const response = await api.post(`/accusations/`, {
      session: session,
      character: suspectId,

    });
    return response.data;
  }

  async getAccusationsBySession(session: string): Promise<Accusation[]> {
    const response = await api.get(`/accusations/`, {
      params: { session: session }
    });
    return response.data.results;
  }

  async isAccusationCorrect(session: string, suspectId: string): Promise<boolean> {
    const response = await api.get(`/accusations/last/`, {
      params: { session: session, character: suspectId }
    });
    return response.data.is_correct;
  }


}