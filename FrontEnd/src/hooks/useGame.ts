import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { CharacterService } from '../services/game/characterService';
import { CluesService } from '../services/game/cluesService';
import { SessionService } from '../services/game/sessionService';
import { PlayerService } from '../services/game/playerService';
import { AccusationService } from '../services/game/accusationService';
import type { Character, Clue, Session } from '../types';

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
}

export const useGame = (storyId: string): UseGameReturn => {
  const [gameState, setGameState] = useState<Session | null>(null);
  const [suspects, setSuspects] = useState<Character[]>([]);
  const [witnesses, setWitnesses] = useState<Character[]>([]);
  const [clues, setClues] = useState<Clue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();
  const toast = useToast();

  const findOrCreateSession = useCallback(async (storyId: string) => {
    try {
      // Vérifier que l'utilisateur est connecté
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        throw new Error('Utilisateur non connecté');
      }

      // Récupérer le joueur actuel
      const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
      
      // TOUJOURS chercher une session fraîche depuis le serveur
      let session = await SessionService.getInstance().findSessionByStoryAndPlayer(storyId, currentPlayer.id);
      
      if (session) {
        // Si une session existe et qu'elle n'est pas terminée, la réutiliser
        if (session.status !== 'finished') {
          // Marquer la session comme en cours si elle est encore en "started"
          if (session.status === 'started') {
            try {
              session = await SessionService.getInstance().updateSessionToStatusPlaying(session.id);
            } catch (updateError) {
              // Continuer avec la session existante même si la mise à jour échoue
            }
          }
          
          return session;
        }
      }
      
      // Créer une nouvelle session seulement si aucune session active n'existe
      try {
        session = await SessionService.getInstance().createSession(storyId, currentPlayer.id);
        
        // Marquer immédiatement la session comme en cours
        if (session.status === 'started') {
          try {
            session = await SessionService.getInstance().updateSessionToStatusPlaying(session.id);
          } catch (updateError) {
            // Continuer avec la session créée même si la mise à jour échoue
          }
        }
        
        return session;
      } catch (createError: any) {
        // Si l'erreur indique qu'une session existe déjà, essayer de la récupérer
        if (createError.response?.data?.includes?.('already have a session') || 
            createError.response?.status === 400) {
          session = await SessionService.getInstance().findSessionByStoryAndPlayer(storyId, currentPlayer.id);
          if (session && session.status !== 'finished') {
            return session;
          }
        }
        throw createError;
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const loadGameData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Trouver ou créer une session pour cette histoire
      const session = await findOrCreateSession(storyId);
      setGameState(session);

      // Récupérer les données du jeu en parallèle
      const [suspectsData, witnessesData, cluesData] = await Promise.all([
        CharacterService.getInstance().getSuspectsByStory(storyId),
        CharacterService.getInstance().getWitnessesByStory(storyId),
        CluesService.getInstance().getCluesByStories(storyId),
      ]);

      setSuspects(suspectsData);
      setWitnesses(witnessesData);
      setClues(cluesData);
    } catch (err) {
      const error = err as Error;
      setError(error);
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
  }, [storyId, findOrCreateSession, toast]);

  useEffect(() => {
    if (storyId) {
      loadGameData();
    }
  }, [loadGameData, storyId]);

  const makeAccusation = async (suspectId: string): Promise<boolean> => {
    if (!gameState) {
      toast({
        title: 'Erreur',
        description: 'Session de jeu non trouvée',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    try {
      const accusation = await AccusationService.getInstance().createAccusation(gameState.id, suspectId);
      
      if (accusation.is_correct) {
        toast({
          title: 'Félicitations !',
          description: 'Vous avez trouvé le coupable !',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        // Mettre à jour la session pour marquer comme terminée
        await SessionService.getInstance().updateSessionToStatusFinished(gameState.id);
      } else {
        // Faire perdre une vie
        const updatedSession = await SessionService.getInstance().loseLife(gameState.id);
        setGameState(updatedSession);
        
        toast({
          title: 'Raté !',
          description: `Ce n'est pas le bon suspect... Il vous reste ${updatedSession.remaining_lives} vie(s).`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        
        // Si la session est maintenant terminée (plus de vies)
        if (updatedSession.status === 'finished') {
          toast({
            title: 'Partie terminée',
            description: 'Vous avez épuisé tous vos essais.',
            status: 'warning',
            duration: 5000,
            isClosable: true,
          });
        }
      }
      
      // Recharger les données pour mettre à jour l'état
      await loadGameData();
      return accusation.is_correct;
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
    if (!gameState) {
      toast({
        title: 'Erreur',
        description: 'Session de jeu non trouvée',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // Utiliser l'instance api au lieu de fetch pour bénéficier des intercepteurs
      const api = (await import('../services/api')).default;
      
      await api.post('/discovered-clues/', {
        clue: clueId,
        session: gameState.id,
      });

      toast({
        title: 'Indice débloqué !',
        description: 'Vous avez débloqué un nouvel indice.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Recharger les données pour mettre à jour l'état
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

    
    if (!storyId) {
      
      toast({
        title: 'Erreur',
        description: 'ID de l\'histoire manquant',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!characterId) {
      
      toast({
        title: 'Erreur',
        description: 'ID du personnage manquant',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Utiliser l'ID de l'histoire pour la navigation (pas l'ID de session)
    const dialogueUrl = `/game/${storyId}/dialogue/${characterId}`;
    
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