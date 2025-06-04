export interface Character {
  id: string;
  name: string;
  image: string;
  description: string;
  backstory: string;
}

export interface Clue {
  id: string;
  name: string;
  description: string;
}

export interface GameMenuProps {
  storyTitle: string;
  onVerdictClick: () => void;
  onTalkClick: (characterId: string) => void;
} 