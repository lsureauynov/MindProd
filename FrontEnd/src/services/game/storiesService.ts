import api from '../api';
import type {Story} from '../../types';

export class StoryService {
    private static instance: StoryService;

    private constructor() {}

    public static getInstance(): StoryService {
        if (!StoryService.instance) {
            StoryService.instance = new StoryService();
        }
        return StoryService.instance;
    }

    async getStoryById(storyId: string): Promise<Story> {
        const response = await api.get(`/stories/${storyId}`);
        return response.data;
    }

    async getStoryScenarioByid(storyId: string){
        const response = await api.get(`/stories/${storyId}`);
        return response.data.scenario;
    }

    async getStories() {
        const response = await api.get('/stories');
        return response.data.results;
    }

}
