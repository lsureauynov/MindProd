import type {BaseEntity} from "../../../types";

export interface Character {
  id: string;
  name: string;
  image_url: string;
  personality: string;
  backstory: string;
}

export interface Clue {
  id: string;
  name: string;
  description: string;
  image_url: string;
  story: string;
}


export interface GameMenuProps {
  storyTitle: string;
  onVerdictClick: () => void;
  onTalkClick: (characterId: string) => void;
}

export interface DiscoveredClue extends BaseEntity {
  clue:string;
  session: string;
}