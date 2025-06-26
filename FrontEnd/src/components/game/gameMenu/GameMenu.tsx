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
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaUserSecret, FaEye, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { CharacterCard } from './components/CharacterCard';
import { ClueCard } from './components/ClueCard';
import { AttemptsIndicator } from './components/AttemptsIndicator';
import { useGame } from '../../../hooks/useGame';
import { gameMenuStyles, gameMenuProps, getGridStyle } from './gameMenuStyles';

const GameMenu: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
        <Box sx={gameMenuStyles.errorBox}>
          <Text sx={gameMenuStyles.errorText}>
            {gameMenuProps.errorMessages.missingId}
          </Text>
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
        <Box sx={gameMenuStyles.errorBox}>
          <Text sx={gameMenuStyles.errorText}>
            {gameMenuProps.errorMessages.loadError}
          </Text>
        </Box>
    );
  }

  if (isLoading) {
    return (
        <Box sx={gameMenuStyles.loadingBox}>
          <Spinner sx={gameMenuStyles.spinner} />
        </Box>
    );
  }

  const remainingAttempts = gameState?.remaining_lives ?? 3;

  const handleAccuseClick = () => {
    navigate(`/game/${id}/accusation`);
  };

  const EmptyState: React.FC<{ icon: any; message: string }> = ({ icon, message }) => (
    <Box sx={gameMenuStyles.emptyState}>
      <Icon as={icon} sx={gameMenuStyles.emptyStateIcon} />
      <Text>{message}</Text>
    </Box>
  );

  const StatsSection: React.FC = () => (
    <HStack sx={gameMenuStyles.statsContainer}>
      <Box sx={gameMenuStyles.statBox}>
        <Text sx={gameMenuStyles.statNumber}>{suspects?.length || 0}</Text>
        <Text sx={gameMenuStyles.statLabel}>{gameMenuProps.stats.suspects}</Text>
      </Box>
      <Box sx={gameMenuStyles.statBox}>
        <Text sx={gameMenuStyles.statNumber}>{witnesses?.length || 0}</Text>
        <Text sx={gameMenuStyles.statLabel}>{gameMenuProps.stats.witnesses}</Text>
      </Box>
      <Box sx={gameMenuStyles.statBox}>
        <Text sx={gameMenuStyles.statNumber}>{clues?.filter(clue => clue.isDiscovered).length || 0}</Text>
        <Text sx={gameMenuStyles.statLabel}>{gameMenuProps.stats.clues}</Text>
      </Box>
      <Box sx={gameMenuStyles.statBox}>
        <Text sx={gameMenuStyles.statNumber}>{remainingAttempts}</Text>
        <Text sx={gameMenuStyles.statLabel}>{gameMenuProps.stats.lives}</Text>
      </Box>
    </HStack>
  );

  return (
      <Box as="main" sx={gameMenuStyles.mainContainer}>
        <Container sx={gameMenuStyles.container}>
          <VStack sx={gameMenuStyles.mainStack}>
            <Box sx={gameMenuStyles.headerBox}>
              <Heading sx={gameMenuStyles.title}>
                {gameMenuProps.title}
              </Heading>
              
              <StatsSection />
              
              <VStack sx={gameMenuStyles.headerStack}>
                <AttemptsIndicator
                    remainingAttempts={remainingAttempts}
                    totalAttempts={3}
                />
                <Button
                    sx={gameMenuStyles.accuseButton}
                    onClick={handleAccuseClick}
                    isDisabled={!gameState || gameState.status === 'finished' || remainingAttempts <= 0}
                >
                  {remainingAttempts <= 0
                      ? gameMenuProps.accuseButton.noAttemptsText
                      : gameMenuProps.accuseButton.defaultText
                  }
                </Button>
              </VStack>
            </Box>

            <VStack sx={gameMenuStyles.contentStack}>
              {/* Section Suspects */}
              <Box sx={gameMenuStyles.sectionContainer}>
                <Heading
                    sx={{
                      ...gameMenuStyles.sectionHeading,
                      ...gameMenuStyles.suspectsHeading,
                    }}
                >
                  <Icon as={FaUserSecret} mr={2} />
                  {gameMenuProps.sections.suspects}
                </Heading>
                
                {(suspects || []).length === 0 ? (
                  <EmptyState 
                    icon={FaExclamationTriangle} 
                    message={gameMenuProps.emptyStates.suspects} 
                  />
                ) : (
                  <Grid 
                    sx={getGridStyle((suspects || []).length)}
                    templateColumns={{ 
                      base: '1fr', 
                      sm: (suspects || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      md: (suspects || []).length >= 3 ? 'repeat(3, 1fr)' : (suspects || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      lg: (suspects || []).length >= 4 ? 'repeat(4, 1fr)' : (suspects || []).length >= 3 ? 'repeat(3, 1fr)' : (suspects || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr'
                    }}
                    gap={6}
                  >
                    {(suspects || []).map((suspect) => (
                        <Box key={suspect.id} sx={gameMenuStyles.cardWrapper}>
                          <CharacterCard
                              character={suspect}
                              onTalkClick={startDialogue}
                          />
                        </Box>
                    ))}
                  </Grid>
                )}
              </Box>

              {/* Section Témoins */}
              <Box sx={gameMenuStyles.sectionContainer}>
                <Heading
                    sx={{
                      ...gameMenuStyles.sectionHeading,
                      ...gameMenuStyles.witnessesHeading,
                    }}
                >
                  <Icon as={FaEye} mr={2} />
                  {gameMenuProps.sections.witnesses}
                </Heading>
                
                {(witnesses || []).length === 0 ? (
                  <EmptyState 
                    icon={FaExclamationTriangle} 
                    message={gameMenuProps.emptyStates.witnesses} 
                  />
                ) : (
                  <Grid 
                    sx={getGridStyle((witnesses || []).length)}
                    templateColumns={{ 
                      base: '1fr', 
                      sm: (witnesses || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      md: (witnesses || []).length >= 3 ? 'repeat(3, 1fr)' : (witnesses || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      lg: (witnesses || []).length >= 4 ? 'repeat(4, 1fr)' : (witnesses || []).length >= 3 ? 'repeat(3, 1fr)' : (witnesses || []).length >= 2 ? 'repeat(2, 1fr)' : '1fr'
                    }}
                    gap={6}
                  >
                    {(witnesses || []).map((witness) => (
                        <Box key={witness.id} sx={gameMenuStyles.cardWrapper}>
                          <CharacterCard
                              character={witness}
                              onTalkClick={() => startDialogue(witness.id)}
                          />
                        </Box>
                    ))}
                  </Grid>
                )}
              </Box>

              {/* Section Indices */}
              <Box sx={gameMenuStyles.sectionContainer}>
                <Heading
                    sx={{
                      ...gameMenuStyles.sectionHeading,
                      ...gameMenuStyles.cluesHeading,
                    }}
                >
                  <Icon as={FaSearch} mr={2} />
                  {gameMenuProps.sections.clues}
                </Heading>
                
                {(clues || []).filter(clue => clue.isDiscovered).length === 0 ? (
                  <EmptyState 
                    icon={FaExclamationTriangle} 
                    message={gameMenuProps.emptyStates.clues} 
                  />
                ) : (
                  <Grid 
                    sx={getGridStyle((clues || []).filter(clue => clue.isDiscovered).length)}
                    templateColumns={{ 
                      base: '1fr', 
                      sm: (clues || []).filter(clue => clue.isDiscovered).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      md: (clues || []).filter(clue => clue.isDiscovered).length >= 3 ? 'repeat(3, 1fr)' : (clues || []).filter(clue => clue.isDiscovered).length >= 2 ? 'repeat(2, 1fr)' : '1fr',
                      lg: (clues || []).filter(clue => clue.isDiscovered).length >= 4 ? 'repeat(4, 1fr)' : (clues || []).filter(clue => clue.isDiscovered).length >= 3 ? 'repeat(3, 1fr)' : (clues || []).filter(clue => clue.isDiscovered).length >= 2 ? 'repeat(2, 1fr)' : '1fr'
                    }}
                    gap={6}
                  >
                    {(clues || []).filter(clue => clue.isDiscovered).map((clue) => (
                        <Box key={clue.id} sx={gameMenuStyles.cardWrapper}>
                          <ClueCard
                              clue={clue}
                              isLocked={!clue.isDiscovered}
                              onUnlock={() => unlockClue(clue.id)}
                          />
                        </Box>
                    ))}
                  </Grid>
                )}
              </Box>
            </VStack>
          </VStack>
        </Container>
      </Box>
  );
};

export default GameMenu;
