import React from 'react';
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

interface Story {
  id: string;
  title: string;
  resume: string;
  author: string;
  imageUrl?: string;
}

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  return (
    <Link
      as={RouterLink}
      to={`/story/${story.id}`}
      _hover={{ textDecoration: 'none' }}
    >
      <Box
        borderWidth="1px"
        borderRadius="xl"
        overflow="hidden"
        bg="gray.800"
        borderColor="whiteAlpha.200"
        transition="all 0.3s"
        position="relative"
        _hover={{
          transform: 'translateY(-4px)',
          shadow: '2xl',
          borderColor: 'brand.primary.500',
          _before: {
            opacity: 1,
          }
        }}
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: 'rgba(0, 0, 0, 0.2)',
          opacity: 0,
          transition: 'opacity 0.3s',
          zIndex: 1,
        }}
      >
        {story.imageUrl && (
          <Image
            src={story.imageUrl}
            alt={story.title}
            height="200px"
            width="100%"
            objectFit="cover"
            transition="transform 0.3s"
            _groupHover={{
              transform: 'scale(1.05)',
            }}
          />
        )}

        <VStack 
          align="stretch" 
          p={6} 
          spacing={4}
          bg="rgba(26, 32, 44, 0.8)"
          backdropFilter="blur(8px)"
        >
          <Heading 
            as="h3" 
            size="md" 
            noOfLines={2}
            color="whiteAlpha.900"
            fontFamily="heading"
            bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
            bgClip="text"
          >
            {story.title}
          </Heading>

          <Text 
            color="whiteAlpha.800" 
            noOfLines={3}
            fontSize="md"
            lineHeight="1.6"
          >
            {story.resume}
          </Text>

          <HStack 
            spacing={4} 
            fontSize="sm" 
            color="brand.primary.400"
            fontFamily="mono"
          >
            <Text>Par {story.author}</Text>
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default StoryCard; 