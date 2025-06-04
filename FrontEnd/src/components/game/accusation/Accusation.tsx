import React from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { useAccusation } from './hooks/useAccusation';
import { SuspectCard } from './components/SuspectCard';
import type { AccusationProps } from './types';

const Accusation: React.FC<AccusationProps> = ({
                                                 suspects,
                                                 correctSuspectId,
                                                 onReturn,
                                                 onAccuse,   // <-- nouvelle prop
                                               }) => {
  const {
    state,
    handleSuspectSelect,
    // on enlève handleAccuse car on le gère via onAccuse prop
  } = useAccusation(correctSuspectId, onReturn);

  const handleAccuseClick = () => {
    if (state.selectedSuspect) {
      onAccuse(state.selectedSuspect.id);
    }
  };

  return (
      <Box
          as="main"
          minH="100vh"
          bg="gray.900"
          bgGradient="linear(to-b, gray.900, gray.800)"
          pt="80px"
      >
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Heading
                  as="h1"
                  size="2xl"
                  mb={4}
                  bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
                  bgClip="text"
                  fontFamily="heading"
              >
                Accusation
              </Heading>
              <Text
                  fontSize="xl"
                  color="whiteAlpha.800"
                  fontFamily="body"
              >
                Sélectionnez le suspect que vous souhaitez accuser
              </Text>
            </Box>

            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: 6, md: 8 }}
                pt={4}
            >
              {suspects.map((suspect) => (
                  <SuspectCard
                      key={suspect.id}
                      suspect={suspect}
                      isSelected={state.selectedSuspect?.id === suspect.id}
                      onSelect={handleSuspectSelect}
                  />
              ))}
            </SimpleGrid>

            <Box textAlign="center" pt={8}>
              <Button
                  bgGradient="linear(to-r, red.600, red.400)"
                  color="white"
                  size="lg"
                  onClick={handleAccuseClick}  // <-- appel prop onAccuse ici
                  isDisabled={!state.selectedSuspect}
                  px={12}
                  py={6}
                  fontSize="xl"
                  _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                    bgGradient: "linear(to-r, red.500, red.300)",
                  }}
                  _active={{
                    transform: 'translateY(0)',
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
                Accuser
              </Button>
            </Box>
          </VStack>
        </Container>
      </Box>
  );
};

export default Accusation;
