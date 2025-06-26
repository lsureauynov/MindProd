import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { SuspectCard } from './components/SuspectCard';
import { accusationStyles, accusationProps } from './accusationStyles';
import type { AccusationProps } from './accusationTypes.ts';
import type { Character } from '../gameMenu/gameMenuTypes.ts';

const Accusation: React.FC<AccusationProps> = ({
                                                 suspects,
                                                 onReturn,
                                                 onAccuse,
                                               }) => {
  const [selectedSuspect, setSelectedSuspect] = useState<Character | null>(null);
  const [isAccusing, setIsAccusing] = useState(false);
  const [accusationResult, setAccusationResult] = useState<{
    type: 'success' | 'error' | 'warning';
    message: string;
  } | null>(null);

  // Réinitialiser l'état de chargement au démontage du composant
  useEffect(() => {
    return () => {
      setIsAccusing(false);
    };
  }, []);

  const handleSuspectSelect = (suspect: Character) => {
    if (!isAccusing) {
      setSelectedSuspect(suspect);
    }
  };

  const handleAccuseClick = async () => {
    if (selectedSuspect && !isAccusing) {
      setIsAccusing(true);
      setAccusationResult(null);
      
      // Timeout de sécurité pour éviter le blocage infini
      const timeoutId = setTimeout(() => {
        setIsAccusing(false);
        setAccusationResult({
          type: 'error',
          message: 'L\'accusation a pris trop de temps. Veuillez réessayer.'
        });
      }, 30000); // 30 secondes
      
      try {
        await onAccuse(selectedSuspect.id);
        
        // Annuler le timeout si l'accusation réussit
        clearTimeout(timeoutId);
        
        // Réinitialiser l'état après un court délai pour permettre la navigation
        setTimeout(() => {
          setIsAccusing(false);
        }, 1000);
        
      } catch (error) {
        // Annuler le timeout en cas d'erreur
        clearTimeout(timeoutId);
        
        setAccusationResult({
          type: 'error',
          message: 'Une erreur est survenue lors de l\'accusation.'
        });
        
        // Réinitialiser l'état de chargement en cas d'erreur
        setIsAccusing(false);
      }
    }
  };

  const handleReturnClick = () => {
    if (!isAccusing) {
      onReturn();
    }
  };

  return (
      <Box sx={accusationStyles.mainContainer}>
        <Container sx={accusationStyles.container}>
          <VStack sx={accusationStyles.mainStack}>
            <Box sx={accusationStyles.headerBox}>
              <Heading sx={accusationStyles.title}>
                {accusationProps.title}
              </Heading>
              <Text sx={accusationStyles.subtitle}>
                {accusationProps.subtitle}
              </Text>
            </Box>

            {accusationResult && (
              <Alert status={accusationResult.type} borderRadius="md" mb={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>
                    {accusationResult.type === 'success' ? 'Succès !' : 
                     accusationResult.type === 'warning' ? 'Attention !' : 'Erreur !'}
                  </AlertTitle>
                  <AlertDescription>{accusationResult.message}</AlertDescription>
                </Box>
              </Alert>
            )}

            <Flex
              wrap="wrap"
              justify="center"
              align="flex-start"
              gap={4}
              w="100%"
              pt={4}
            >
              {suspects.map((suspect) => (
                  <SuspectCard
                      key={suspect.id}
                      suspect={suspect}
                      isSelected={selectedSuspect?.id === suspect.id}
                      onSelect={handleSuspectSelect}
                      isDisabled={isAccusing}
                  />
              ))}
            </Flex>

            <Box sx={accusationStyles.buttonContainer}>
              <Button
                  sx={accusationStyles.accuseButton}
                  onClick={handleAccuseClick}
                  isDisabled={!selectedSuspect || isAccusing}
                  isLoading={isAccusing}
                  loadingText="Accusation en cours..."
              >
                {isAccusing ? (
                  <>
                    <Spinner size="sm" mr={2} />
                    Accusation en cours...
                  </>
                ) : (
                  accusationProps.accuseButtonText
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleReturnClick}
                isDisabled={isAccusing}
                mt={4}
              >
                Retour au menu
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
  );
};

export default Accusation;
