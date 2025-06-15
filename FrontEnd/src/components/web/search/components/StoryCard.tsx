import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  VStack,
  Link,
} from '@chakra-ui/react';
import { storyCardStyles, storyCardProps } from './storyCardStyles';
import type { StoryCardProps} from "./../searchTypes";

const StoryCard: React.FC<StoryCardProps> = ({story}) => {
  return (
      <Link
          as={RouterLink as React.ElementType}
          to={`/story/${story.id}`}
          sx={storyCardStyles.link}
      >
      <Box sx={storyCardStyles.card}>
        {story.imageUrl && (
          <Image
            src={story.imageUrl}
            alt={story.title}
            sx={storyCardStyles.image}
          />
        )}

        <VStack 
          {...storyCardProps.content}
          sx={storyCardStyles.content}
        >
          <Heading 
            {...storyCardProps.title}
            sx={storyCardStyles.title}
          >
            {story.title}
          </Heading>

          <Text 
            {...storyCardProps.description}
            sx={storyCardStyles.description}
          >
            {story.resume}
          </Text>

          <HStack 
            {...storyCardProps.footer}
            sx={storyCardStyles.footer}
          >
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default StoryCard; 