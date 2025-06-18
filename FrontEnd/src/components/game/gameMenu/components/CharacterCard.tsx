import { useState } from 'react';
import { Box, Image, Text, Button, VStack, Collapse, Icon } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { characterCardStyles, characterCardProps } from './characterCardStyles';
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
    <Box sx={characterCardStyles.container} onClick={toggleExpand}>
      <Image
        src={character.image_url}
        alt={character.name}
        sx={characterCardStyles.image}
      />
      <VStack sx={characterCardStyles.contentStack}>
        <Box sx={characterCardStyles.headerBox}>
          <Text sx={characterCardStyles.nameText}>
            {character.name}
          </Text>
          <Icon
            as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
            sx={characterCardStyles.chevronIcon}
          />
        </Box>

        <Collapse in={isExpanded} animateOpacity>
          <VStack sx={characterCardStyles.expandedStack}>
            <Box>
              <Text sx={characterCardStyles.personalityLabel}>
                {characterCardProps.labels.personality}
              </Text>
              <Text sx={characterCardStyles.personalityText}>
                {character.personality}
              </Text>
            </Box>
            <Box>
              <Text sx={characterCardStyles.backstoryLabel}>
                {characterCardProps.labels.backstory}
              </Text>
              <Text sx={characterCardStyles.backstoryText}>
                {character.backstory}
              </Text>
            </Box>
          </VStack>
        </Collapse>

        <Button
          sx={characterCardStyles.talkButton}
          onClick={handleTalkClick}
          isDisabled={false}
          aria-label={characterCardProps.buttonText(character.name)}
        >
          {characterCardProps.buttonText(character.name)}
        </Button>
      </VStack>
    </Box>
  );
}; 