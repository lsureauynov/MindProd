export interface Story {
    id: string;
    title: string;
    resume: string;
    imageUrl?: string;
}

export interface StoryCardProps {
    story: Story;
}