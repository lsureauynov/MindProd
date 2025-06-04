// Types globaux de l'application
export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User extends BaseEntity {
  email: string;
  username: string;
  avatar?: string;
}

export interface Story extends BaseEntity {
  title: string;
  description: string;
  coverImage: string;
  authorId: string;
  isPublished: boolean;
}

export interface Character extends BaseEntity {
  name: string;
  image: string;
  type: 'SUSPECT' | 'WITNESS';
  storyId: string;
}

export interface Clue extends BaseEntity {
  name: string;
  description: string;
  storyId: string;
}

export interface Dialogue extends BaseEntity {
  characterId: string;
  content: string[];
  order: number;
}

export interface GameState extends BaseEntity {
  storyId: string;
  userId: string;
  unlockedClues: string[];
  completedDialogues: string[];
  isCompleted: boolean;
  accusationMade: boolean;
  remainingAttempts: number;
} 