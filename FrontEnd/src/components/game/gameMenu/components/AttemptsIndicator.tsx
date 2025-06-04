import React from 'react';
import {
  Box,
  HStack,
  Text,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { WarningIcon } from '@chakra-ui/icons';

const pulseKeyframes = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

interface AttemptsIndicatorProps {
  remainingAttempts: number;
  totalAttempts: number;
}

export const AttemptsIndicator: React.FC<AttemptsIndicatorProps> = ({
  remainingAttempts,
  totalAttempts,
}) => {
  const isLowAttempts = remainingAttempts === 1;
  const pulseAnimation = `${pulseKeyframes} 2s infinite`;

  return (
    <Box
      bg="gray.800"
      borderRadius="xl"
      p={4}
      borderWidth="1px"
      borderColor={isLowAttempts ? "red.500" : "whiteAlpha.200"}
      transition="all 0.3s"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: isLowAttempts ? 'red.500' : 'whiteAlpha.100',
        opacity: 0.1,
      }}
    >
      <HStack spacing={4} align="center">
        <Box flex="1">
          <Text
            fontSize="sm"
            color="whiteAlpha.700"
            mb={1}
          >
            Essais restants
          </Text>
          <HStack spacing={2}>
            {[...Array(totalAttempts)].map((_, index) => (
              <Box
                key={index}
                w="12px"
                h="12px"
                borderRadius="full"
                bg={index < remainingAttempts ? 
                  (isLowAttempts ? "red.500" : "brand.primary.500") : 
                  "whiteAlpha.200"}
                animation={index < remainingAttempts && isLowAttempts ? pulseAnimation : undefined}
                transition="all 0.3s"
                _hover={{
                  transform: index < remainingAttempts ? "scale(1.2)" : "none",
                }}
              />
            ))}
          </HStack>
        </Box>
        {isLowAttempts && (
          <Tooltip 
            label="Dernier essai ! Réfléchissez bien..." 
            placement="top"
            hasArrow
          >
            <Box animation={pulseAnimation}>
              <Icon
                as={WarningIcon}
                w={6}
                h={6}
                color="red.500"
              />
            </Box>
          </Tooltip>
        )}
      </HStack>
    </Box>
  );
}; 