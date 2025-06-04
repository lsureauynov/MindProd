import React from 'react';
import {
  Button,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';

interface StoryPlayButtonProps {
  onPlay: () => void;
  isAuthenticated: boolean;
}

const StoryPlayButton: React.FC<StoryPlayButtonProps> = ({ onPlay, isAuthenticated }) => {
  if (!isAuthenticated) {
    return null;
  }

  return (
    <Tooltip label="Démarrer l'histoire" placement="top">
      <Button
        leftIcon={<Icon as={FaPlay} />}
        colorScheme="green"
        size="lg"
        onClick={onPlay}
        position="fixed"
        bottom="2rem"
        right="2rem"
        borderRadius="full"
        width="60px"
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="lg"
        _hover={{
          transform: 'scale(1.05)',
        }}
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        Play
      </Button>
    </Tooltip>
  );
};

export default StoryPlayButton; 