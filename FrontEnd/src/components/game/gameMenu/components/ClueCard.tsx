import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';
import { LockIcon, UnlockIcon } from '@chakra-ui/icons';
import type { Clue } from '../../../../types';

export interface ClueCardProps {
  clue: Clue;
  isLocked: boolean;
  onUnlock: () => void;
}

export const ClueCard: React.FC<ClueCardProps> = ({ clue, isLocked, onUnlock }) => {
  return (
      <Box
          borderWidth="1px"
          borderRadius="xl"
          overflow="hidden"
          p={0}
          bg="gray.800"
          borderColor="whiteAlpha.200"
          position="relative"
          transition="all 0.3s"
          _hover={{
            transform: 'translateY(-4px)',
            shadow: '2xl',
            borderColor: 'brand.accent.500',
          }}
      >
        {!isLocked && (
            <Image
                src={clue.image_url}
                alt={clue.name}
                objectFit="cover"
                w="full"
                h="150px"
            />
        )}
        <VStack spacing={4} align="stretch" p={6} position="relative" zIndex={2}>
          <Heading
              size="md"
              isTruncated
              color="whiteAlpha.900"
              fontFamily="heading"
              bgGradient="linear(to-r, brand.accent.400, brand.primary.400)"
              bgClip="text"
          >
            {clue.name}
          </Heading>
          {isLocked ? (
              <Button
                  leftIcon={<LockIcon />}
                  variant="outline"
                  onClick={onUnlock}
                  size="sm"
                  borderColor="brand.accent.500"
                  color="brand.accent.400"
                  _hover={{
                    bg: "whiteAlpha.100",
                    borderColor: "brand.accent.400",
                    transform: "translateY(-2px)"
                  }}
              >
                Débloquer l'indice
              </Button>
          ) : (
              <>
                <Text
                    fontSize="sm"
                    color="whiteAlpha.800"
                    fontFamily="body"
                >
                  {clue.description}
                </Text>
                <Box>
                  <UnlockIcon color="brand.accent.400" />
                </Box>
              </>
          )}
        </VStack>
      </Box>
  );
};
