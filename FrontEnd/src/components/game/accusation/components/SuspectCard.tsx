import React from 'react';
import {
  Box,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { SuspectCardProps } from '../types';

export const SuspectCard: React.FC<SuspectCardProps> = ({
  suspect,
  isSelected,
  onSelect,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="gray.800"
      borderColor={isSelected ? "brand.primary.500" : "whiteAlpha.200"}
      cursor="pointer"
      onClick={() => onSelect(suspect)}
      position="relative"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: '2xl',
        borderColor: 'brand.primary.400',
      }}
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: isSelected ? 'brand.primary.500' : 'transparent',
        opacity: isSelected ? 0.1 : 0,
        transition: 'opacity 0.3s',
      }}
    >
      <Image
        src={suspect.image}
        alt={suspect.name}
        height="200px"
        width="100%"
        objectFit="cover"
        transition="transform 0.3s"
        _groupHover={{
          transform: 'scale(1.05)',
        }}
      />
      <VStack 
        p={4} 
        spacing={2} 
        align="center"
        bg="rgba(26, 32, 44, 0.8)"
        backdropFilter="blur(8px)"
      >
        <Text
          fontWeight="bold"
          fontSize="lg"
          textAlign="center"
          color="whiteAlpha.900"
          fontFamily="heading"
          bgGradient={isSelected ? "linear(to-r, brand.primary.400, brand.secondary.400)" : "none"}
          bgClip={isSelected ? "text" : "none"}
        >
          {suspect.name}
        </Text>
      </VStack>
    </Box>
  );
}; 