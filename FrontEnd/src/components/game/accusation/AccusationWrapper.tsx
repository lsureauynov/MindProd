import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { CharacterService } from '../../../services/game/characterService';
import { AccusationService } from '../../../services/game/accusationService';
import { SessionService } from '../../../services/game/sessionService';
import { PlayerService } from '../../../services/game/playerService';
import Accusation from './Accusation';
import type { Character } from '../gameMenu/gameMenuTypes.ts';

const AccusationWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [suspects, setSuspects] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
        
        let session = await SessionService.getInstance().findSessionByStoryAndPlayer(id, currentPlayer.id);
        
        if (!session) {
          toast({
            title: "Erreur",
            description: "Aucune session de jeu trouvée. Retour au menu.",
            status: "error",
            duration: 5000,
            isClosable: true
          });
          navigate(`/game/${id}`);
          return;
        }
        
        setSessionId(session.id);
        
        const suspectsData = await CharacterService.getInstance().getSuspectsByStory(id);
        setSuspects(suspectsData);
      } catch (err) {
        setError("Erreur lors du chargement des suspects");
        toast({
          title: "Erreur",
          description: "Impossible de charger les suspects",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast, navigate]);

  const handleReturn = () => {
    navigate(`/game/${id}`);
  };

  const handleAccusation = async (suspectId: string) => {
    if (!sessionId) {
      return;
    }
    
    try {
      const accusation = await AccusationService.getInstance().createAccusation(sessionId, suspectId);
      
      if (accusation.is_correct) {
        toast({
          title: "Félicitations !",
          description: "Vous avez trouvé le coupable ! L'enquête est terminée.",
          status: "success",
          duration: 5000,
          isClosable: true
        });
        
        try {
          await SessionService.getInstance().updateSessionToStatusFinished(sessionId);
        } catch (finishError) {
          // Continuer même si la finalisation échoue
        }
        
        setTimeout(() => {
          navigate('/');
        }, 3000);
        
      } else {
        try {
          const updatedSession = await SessionService.getInstance().loseLife(sessionId);
          
          if (updatedSession.status === 'finished') {
            // Plus de vies, partie terminée
            toast({
              title: "Partie terminée",
              description: "Vous avez épuisé toutes vos vies. L'enquête est terminée.",
              status: "warning",
              duration: 5000,
              isClosable: true
            });
            
            setTimeout(() => {
              navigate('/');
            }, 3000);
            
          } else {
            toast({
              title: "Mauvaise accusation",
              description: `Ce n'est pas le bon suspect. Il vous reste ${updatedSession.remaining_lives} vie(s).`,
              status: "error",
              duration: 5000,
              isClosable: true
            });
            
            setTimeout(() => {
              navigate(`/game/${id}`);
            }, 2000);
          }
          
        } catch (lifeError) {
          toast({
            title: "Mauvaise accusation",
            description: "Ce n'est pas le bon suspect. Continuez à chercher !",
            status: "error",
            duration: 5000,
            isClosable: true
          });
          
          setTimeout(() => {
            navigate(`/game/${id}`);
          }, 2000);
        }
      }
      
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de faire l'accusation. Veuillez réessayer.",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error || !suspects.length) {
    return <div>Erreur : {error || "Aucun suspect trouvé"}</div>;
  }

  return (
    <Accusation
      suspects={suspects}
      onAccuse={handleAccusation}
      onReturn={handleReturn}
    />
  );
};

export default AccusationWrapper; 