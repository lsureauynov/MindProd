import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import Accusation from './Accusation';
import type { Character } from '../gameMenu/types';

const AccusationWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [suspects, setSuspects] = useState<Character[]>([]);
  const [correctSuspectId, setCorrectSuspectId] = useState<string>('');

  useEffect(() => {
    // Mock data - À remplacer par un appel API
    const mockSuspects: Character[] = [
      { id: '1', name: 'Jean Dupont', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
      { id: '2', name: 'Marie Martin', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    ];
    
    // Simuler que Jean Dupont est le coupable
    const mockCorrectSuspectId = '1';

    setSuspects(mockSuspects);
    setCorrectSuspectId(mockCorrectSuspectId);
  }, []);

  const handleReturn = () => {
    navigate(`/game/${id}`);
  };

  if (!suspects.length || !correctSuspectId) {
    return null; // Ou un composant de chargement
  }

  return (
    <Accusation
      suspects={suspects}
      correctSuspectId={correctSuspectId}
      onReturn={handleReturn}
    />
  );
};

export default AccusationWrapper; 