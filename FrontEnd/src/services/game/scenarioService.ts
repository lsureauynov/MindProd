import api from '../api';
import type { Scenario } from '../../types';

export class ScenarioService {
    private static instance: ScenarioService;

    private constructor() {}

    public static getInstance(): ScenarioService {
        if (!ScenarioService.instance) {
            ScenarioService.instance = new ScenarioService();
        }
        return ScenarioService.instance;
    }

    async getScenarioById(scenarioId: string): Promise<Scenario> {
        const response = await api.get(`/scenarios/${scenarioId}`);
        return response.data;
    }

}