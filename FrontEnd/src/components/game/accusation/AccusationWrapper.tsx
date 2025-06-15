import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Accusation from './Accusation';
import type { Character } from '../gameMenu/gameMenuTypes.ts';

const AccusationWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [suspects, setSuspects] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuspects = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
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

    fetchSuspects();
  }, [id, toast]);

  const handleReturn = () => {
    navigate(`/game/${id}`);
  };

  const handleAccusation = async (suspectId: string) => {
    if (!id) return;
    
    try {
      const result = await accusationService.makeAccusation(id, suspectId);
      
      if (result.correct) {
        toast({
          title: "Félicitations !",
          description: "Vous avez trouvé le coupable !",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } else {
        toast({
          title: "Mauvaise accusation",
          description: "Ce n'est pas le bon suspect. Continuez à chercher !",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de faire l'accusation",
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