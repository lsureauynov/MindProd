import React from 'react';
import {
  HStack,
  Button,
  Icon,
} from '@chakra-ui/react';
import { FaHeart, FaShare } from 'react-icons/fa';

interface StoryActionsProps {
  likes: number;
  onLike: () => void;
  onShare: () => void;
}

const StoryActions: React.FC<StoryActionsProps> = ({ likes, onLike, onShare }) => {
  return (
    <HStack spacing={4} justify="center" py={4}>
      <Button
        leftIcon={<Icon as={FaHeart} />}
        colorScheme="red"
        variant="ghost"
        onClick={onLike}
      >
        {likes} Likes
      </Button>
      <Button
        leftIcon={<Icon as={FaShare} />}
        colorScheme="blue"
        variant="ghost"
        onClick={onShare}
      >
        Partager
      </Button>
    </HStack>
  );
};

export default StoryActions; 