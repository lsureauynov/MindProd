import {
  Box,
  Heading,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import type { Clue, DiscoveredClue } from '../../gameMenu/gameMenuTypes.ts';
import { ClueCard } from '../../gameMenu/components/ClueCard';

interface CluesListProps {
  clues: Clue[];
  discoveredClues: DiscoveredClue[];
  onExpandChange?: (isExpanded: boolean) => void;
}

export const CluesList: React.FC<CluesListProps> = ({ clues, discoveredClues, onExpandChange }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpandToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandChange?.(newExpandedState);
  };

  const discoveredClueIds = new Set(discoveredClues.map(dc => dc.clue));

  const unlockedClues = clues.filter(clue => discoveredClueIds.has(clue.id));

  return (
      <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          bg="white"
          boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
          zIndex={1}
          maxHeight={isExpanded ? "40vh" : "60px"}
          transition="max-height 0.3s ease-in-out"
      >
        <Box p={4} display="flex" alignItems="center" justifyContent="space-between">
          <Heading size="md">Indices découverts ({unlockedClues.length})</Heading>
          <IconButton
              aria-label={isExpanded ? "Réduire les indices" : "Agrandir les indices"}
              icon={isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
              onClick={handleExpandToggle}
              variant="ghost"
          />
        </Box>

        <Box
            p={4}
            overflowY="auto"
            maxH={isExpanded ? "calc(40vh - 60px)" : "0"}
            opacity={isExpanded ? 1 : 0}
            transition="all 0.3s ease-in-out"
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {unlockedClues.map((clue) => (
                <ClueCard key={clue.id} clue={clue} isLocked={false} onUnlock={() => {}} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
  );
};
