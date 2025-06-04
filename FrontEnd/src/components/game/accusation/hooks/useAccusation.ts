import { useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import type { Character } from '../../gameMenu/types';
import type { AccusationState } from '../types';

export const useAccusation = (correctSuspectId: string, onReturn: () => void) => {
  const [state, setState] = useState<AccusationState>({
    selectedSuspect: null,
    isModalOpen: false,
    isCorrect: null,
  });

  const toast = useToast();

  const handleSuspectSelect = useCallback((suspect: Character) => {
    setState(prev => ({
      ...prev,
      selectedSuspect: suspect,
    }));
  }, []);

  const handleAccuse = useCallback(() => {
    if (!state.selectedSuspect) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner un suspect à accuser",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const isCorrect = state.selectedSuspect.id === correctSuspectId;

    setState(prev => ({
      ...prev,
      isModalOpen: true,
      isCorrect,
    }));

    toast({
      title: isCorrect ? "Félicitations !" : "Dommage...",
      description: isCorrect 
        ? "Vous avez trouvé le coupable !"
        : "Ce n'est pas le bon suspect. Continuez votre enquête.",
      status: isCorrect ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });

    // Retour au menu du jeu après un court délai
    setTimeout(onReturn, 2000);
  }, [state.selectedSuspect, correctSuspectId, toast, onReturn]);

  const handleCloseModal = useCallback(() => {
    setState(prev => ({
      ...prev,
      isModalOpen: false,
    }));
  }, []);

  return {
    state,
    handleSuspectSelect,
    handleAccuse,
    handleCloseModal,
  };
}; 