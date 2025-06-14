import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Heading,
  VStack,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { CharacterCard } from './components/CharacterCard';
import { ClueCard } from './components/ClueCard';
import { AttemptsIndicator } from './components/AttemptsIndicator';
import { useGame } from '../../../hooks/useGame';

const GameMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
        <Box
            textAlign="center"
            py={10}
            minH="100vh"
            bg="gray.900"
            color="red.400"
        >
          <Text fontSize="xl">ID du jeu manquant. Impossible de charger le jeu.</Text>
        </Box>
    );
  }

  const {
    gameState,
    suspects,
    witnesses,
    clues,
    isLoading,
    error,
    unlockClue,
    startDialogue,
  } = useGame(id);

  if (error) {
    return (
        <Box
            textAlign="center"
            py={10}
            minH="100vh"
            bg="gray.900"
            color="red.400"
        >
          <Text fontSize="xl">Une erreur est survenue lors du chargement du jeu.</Text>
        </Box>
    );
  }

  if (isLoading) {
    return (
        <Box
            textAlign="center"
            py={10}
            minH="100vh"
            bg="gray.900"
            color="brand.primary.400"
        >
          <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Box>
    );
  }

  const remainingAttempts = gameState?.remaining_lives ?? 3;

  const handleAccuseClick = () => {
    navigate(`/game/${id}/accusation`);
  };

  return (
      <Box
          as="main"
          minH="100vh"
          bg="gray.900"
          bgGradient="linear(to-b, gray.900, gray.800)"
          py={8}
      >
        <Container maxW="container.xl">
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading
                  as="h1"
                  size="xl"
                  mb={8}
                  bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
                  bgClip="text"
                  fontFamily="heading"
              >
                Mode Investigation
              </Heading>
              <VStack spacing={4} align="center">
                <AttemptsIndicator
                    remainingAttempts={remainingAttempts}
                    totalAttempts={3}
                />
                <Button
                    bgGradient="linear(to-r, red.600, red.400)"
                    color="white"
                    size="lg"
                    onClick={handleAccuseClick}
                    isDisabled={!gameState || gameState.accusationMade || remainingAttempts <= 0}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      bgGradient: "linear(to-r, red.500, red.300)",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, red.700, red.500)",
                    }}
                    _disabled={{
                      opacity: 0.6,
                      cursor: 'not-allowed',
                      _hover: {
                        transform: 'none',
                        boxShadow: 'none',
                      }
                    }}
                >
                  {remainingAttempts <= 0
                      ? "Plus d'essais disponibles"
                      : "Faire une accusation"
                  }
                </Button>
              </VStack>
            </Box>

            <VStack spacing={8} align="stretch">
              <Heading
                  as="h2"
                  size="lg"
                  color="brand.primary.400"
                  fontFamily="heading"
                  borderBottom="2px"
                  borderColor="brand.primary.500"
                  pb={2}
              >
                Suspects
              </Heading>
              <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                  gap={6}
                  position="relative"
                  zIndex={1}
              >
                {suspects.map((suspect) => (
                    <Box
                        key={suspect.id}
                        position="relative"
                        zIndex={2}
                    >
                      <CharacterCard
                          character={suspect}
                          onTalkClick={startDialogue}
                      />
                    </Box>
                ))}
              </Grid>

              <Heading
                  as="h2"
                  size="lg"
                  color="brand.secondary.400"
                  fontFamily="heading"
                  borderBottom="2px"
                  borderColor="brand.secondary.500"
                  pb={2}
              >
                Témoins
              </Heading>
              <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                  gap={6}
              >
                {witnesses.map((witness) => (
                    <CharacterCard
                        key={witness.id}
                        character={witness}
                        onTalkClick={() => startDialogue(witness.id)}
                    />
                ))}
              </Grid>

              <Heading
                  as="h2"
                  size="lg"
                  color="brand.accent.400"
                  fontFamily="heading"
                  borderBottom="2px"
                  borderColor="brand.accent.500"
                  pb={2}
              >
                Indices
              </Heading>
              <Grid
                  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                  gap={6}
              >
                {clues.map((clue) => (
                    <ClueCard
                        key={clue.id}
                        clue={clue}
                        isLocked={!gameState?.unlockedClues.includes(clue.id)}
                        onUnlock={() => unlockClue(clue.id)}
                    />
                ))}
              </Grid>
            </VStack>
          </VStack>
        </Container>
      </Box>
  );
};

export default GameMenu;
