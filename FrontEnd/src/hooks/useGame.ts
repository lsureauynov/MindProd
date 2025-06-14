import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { GameService } from '../services/game/gameService';
import type { Character, Clue, Session, Accusation } from '../types';

interface UseGameReturn {
  gameState: Session | null;
  suspects: Character[];
  witnesses: Character[];
  clues: Clue[];
  isLoading: boolean;
  error: Error | null;
  makeAccusation: (suspectId: string) => Promise<boolean>;
  unlockClue: (clueId: string) => Promise<void>;
  startDialogue: (characterId: string) => void;
  pastAccusations: (accusation : string) => void
}

export const useGame = (gameId: string): UseGameReturn => {
  const [gameState, setGameState] = useState<Session | null>(null);
  const [suspects, setSuspects] = useState<Character[]>([]);
  const [witnesses, setWitnesses] = useState<Character[]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const toast = useToast();
  const gameService = GameService.getInstance();

  const loadGameData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [state, suspectsData, witnessesData, cluesData] = await Promise.all([
        gameService.getGameState(gameId),
        gameService.getSuspects(gameId),
        gameService.getWitnesses(gameId),
        gameService.getClues(gameId),
      ]);

      setGameState(state);
      setSuspects(suspectsData);
      setWitnesses(witnessesData);
      setClues(cluesData);
    } catch (err) {
      setError(err as Error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données du jeu',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  }, [gameId, gameService, toast]);

  useEffect(() => {
    loadGameData();
  }, [loadGameData]);

  const makeAccusation = async (suspectId: string): Promise<boolean> => {
    try {
      const result = await gameService.makeAccusation(gameId, suspectId);
      if (result.correct) {
        toast({
          title: 'Félicitations !',
          description: 'Vous avez trouvé le coupable !',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Raté !',
          description: 'Ce n\'est pas le bon suspect...',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
      return result.correct;
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Impossible de faire l\'accusation',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

  const unlockClue = async (clueId: string): Promise<void> => {
    try {
      await gameService.unlockClue(gameId, clueId);
      await loadGameData();
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Impossible de débloquer l\'indice',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const startDialogue = (characterId: string): void => {
    console.log('Starting dialogue with:', { gameId, characterId });
    
    if (!gameId) {
      console.error('Game ID is missing');
      toast({
        title: 'Erreur',
        description: 'ID du jeu manquant',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!characterId) {
      console.error('Character ID is missing');
      toast({
        title: 'Erreur',
        description: 'ID du personnage manquant',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const dialogueUrl = `/game/${gameId}/dialogue/${characterId}`;
    console.log('Navigating to:', dialogueUrl);
    navigate(dialogueUrl);
  };

  return {
    gameState,
    suspects,
    witnesses,
    clues,
    isLoading,
    error,
    makeAccusation,
    unlockClue,
    startDialogue,
  };
}; 