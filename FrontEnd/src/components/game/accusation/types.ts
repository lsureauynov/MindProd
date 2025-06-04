import type { Character } from '../gameMenu/types';

export interface AccusationState {
  selectedSuspect: Character | null;
  isModalOpen: boolean;
  isCorrect: boolean | null;
}

export interface AccusationProps {
  suspects: Character[];
  correctSuspectId: string;
  onReturn: () => void;
}

export interface SuspectCardProps {
  suspect: Character;
  isSelected: boolean;
  onSelect: (suspect: Character) => void;
} 