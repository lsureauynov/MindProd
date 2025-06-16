import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import { clueCardStyles, clueCardProps } from './clueCardStyles';
import type { Clue } from '../../../../types';

export interface ClueCardProps {
  clue: Clue;
  isLocked: boolean;
  onUnlock: () => void;
}

export const ClueCard: React.FC<ClueCardProps> = ({ clue, isLocked, onUnlock }) => {
  return (
      <Box sx={clueCardStyles.container}>
        {!isLocked && (
            <Image
                src={clue.image_url}
                alt={clue.name}
                sx={clueCardStyles.image}
            />
        )}
        <VStack sx={clueCardStyles.contentStack}>
          <Heading sx={clueCardStyles.title}>
            {clue.name}
          </Heading>
          {isLocked ? (
              <Button
                  leftIcon={<LockIcon />}
                  sx={clueCardStyles.unlockButton}
                  onClick={onUnlock}
              >
                {clueCardProps.unlockButtonText}
              </Button>
          ) : (
              <>
                <Text sx={clueCardStyles.description}>
                  {clue.description}
                </Text>
                <Box>
                  <UnlockIcon sx={clueCardStyles.unlockedIcon} />
                </Box>
              </>
          )}
        </VStack>
      </Box>
  );
};
