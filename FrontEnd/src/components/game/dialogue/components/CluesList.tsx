import React from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import type { Clue } from '../../gameMenu/gameMenuTypes';
import type { EnrichedDiscoveredClue } from '../../../../types';
import { ClueCard } from '../../gameMenu/components/ClueCard';
import { cluesListStyles, cluesListProps } from './cluesListStyles';

interface CluesListProps {
  clues: Clue[];
  discoveredClues: EnrichedDiscoveredClue[];
  onExpandChange?: (isExpanded: boolean) => void;
  onClueClick?: (clue: Clue) => void;
}

export const CluesList: React.FC<CluesListProps> = ({ 
  clues, 
  discoveredClues, 
  onExpandChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleExpandToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    onExpandChange?.(newExpandedState);
  };

  const discoveredClueIds = new Set(discoveredClues.map(dc => dc.clue.id));
  const unlockedClues = clues.filter(clue => discoveredClueIds.has(clue.id));

  return (
    <Box sx={cluesListStyles.container}>
      <Box sx={cluesListStyles.header}>
        <Heading sx={cluesListStyles.title}>
          {cluesListProps.titleText(unlockedClues.length)}
        </Heading>
        <IconButton
          aria-label={isExpanded ? cluesListProps.toggleLabels.collapse : cluesListProps.toggleLabels.expand}
          icon={isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
          onClick={handleExpandToggle}
          variant="ghost"
        />
      </Box>

      <Box sx={cluesListStyles.content}>
        <SimpleGrid sx={cluesListStyles.grid}>
          {unlockedClues.map((clue) => (
            <ClueCard 
              key={clue.id} 
              clue={clue} 
              isLocked={false} 
              onUnlock={() => {}}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};
