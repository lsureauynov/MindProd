// Types globaux de l'application
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends BaseEntity {
  email: string;
  name: string;
  surname: string;
  image_url: string;
  avatar?: string;
}

export interface Story extends BaseEntity {
  title: string;
  resume: string;
  image_url: string;
  scenario: string;
}

export interface Scenario extends BaseEntity {
    scenario: string;
}

export interface Character extends BaseEntity {
  name: string;
  image_url: string;
  role: 'Suspect' | 'Witness';
  personality: string;
  backstory: string;
  story: string;
}

export interface Clue extends BaseEntity {
  name: string;
  description: string;
  image_url: string;
  story: string;
}

export interface Dialogue extends BaseEntity {
  character: string;
  session: string;
  player: string;
  character_answer: string;
  player_question: string;
  created_at: string;
}

export interface Session extends BaseEntity {
    player: string;
    story: string;
    ended_at: string;
    status: 'started' | 'finished' | 'playing';
    remaining_lives: number;
    created_at: string;
}

export interface Player extends BaseEntity {
  username: string;
  image_url ?: string;
  user: string;
}

export interface DiscoveredClue extends BaseEntity {
  clue:string;
  session: string;
}

export interface CharactersRevealClue extends BaseEntity {
    character: string;
    conditions: string;
    clue: string;
}

export interface CharactersAttributes extends BaseEntity {
    character: string;
    clue: string[];
}

export interface Accusation extends BaseEntity {
    session: string;
    character: string;
    created_at: string;
    is_correct: boolean;
}