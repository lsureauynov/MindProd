import { useState } from 'react';
import { Box, Image, Text, Button, VStack, Collapse, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { Character } from '../gameMenuTypes.ts';

interface CharacterCardProps {
  character: Character;
  onTalkClick: (characterId: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onTalkClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTalkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTalkClick(character.id);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="gray.800"
      borderColor="whiteAlpha.200"
      position="relative"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: '2xl',
        borderColor: 'brand.primary.400',
      }}
      onClick={toggleExpand}
      cursor="pointer"
    >
      <Image
        src={character.image_url}
        alt={character.name}
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
        spacing={3} 
        align="stretch"
        bg="rgba(26, 32, 44, 0.8)"
        position="relative"
        zIndex={2}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text 
            fontWeight="bold" 
            fontSize="lg"
            color="whiteAlpha.900"
            fontFamily="heading"
          >
            {character.name}
          </Text>
          <Icon
            as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            color="whiteAlpha.600"
            w={6}
            h={6}
            transition="transform 0.2s"
          />
        </Box>

        <Collapse in={isExpanded} animateOpacity>
          <VStack spacing={3} pt={2} pb={3}>
            <Box>
              <Text 
                fontSize="sm" 
                color="brand.primary.300"
                fontWeight="semibold"
                mb={1}
              >
                Personnalité
              </Text>
              <Text 
                fontSize="sm" 
                color="whiteAlpha.800"
              >
                {character.personality}
              </Text>
            </Box>
            <Box>
              <Text 
                fontSize="sm" 
                color="brand.secondary.300"
                fontWeight="semibold"
                mb={1}
              >
                Dans cette affaire
              </Text>
              <Text 
                fontSize="sm" 
                color="whiteAlpha.800"
              >
                {character.backstory}
              </Text>
            </Box>
          </VStack>
        </Collapse>

        <Button
          bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
          color="white"
          position="relative"
          zIndex={3}
          cursor="pointer"
          py={3}
          transition="all 0.2s"
          _hover={{
            bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
            transform: "translateY(-2px)",
            boxShadow: "xl"
          }}
          _active={{
            transform: "translateY(0)",
            bgGradient: "linear(to-r, brand.primary.700, brand.secondary.700)",
          }}
          onClick={handleTalkClick}
          isDisabled={false}
          aria-label={`Parler avec ${character.name}`}
        >
          Parler avec {character.name}
        </Button>
      </VStack>
    </Box>
  );
}; 