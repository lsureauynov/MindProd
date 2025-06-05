export interface Story {
    id: string;
    title: string;
    resume: string;
    imageUrl?: string;
}

export interface SearchResultsProps {
    searchQuery: string;
    stories: Story[];
}

export interface StoryCardProps {
    story: Story;
}