import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Grid, 
  Box, 
  Heading, 
  Text, 
  Link,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

interface StoryPreviewProps {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const StoryPreview: React.FC<StoryPreviewProps> = ({ title, description, link, linkText }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)');

  return (
    <Box
      bg={bgColor}
      borderRadius="lg"
      p={6}
      textAlign="center"
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: `0 4px 12px ${shadowColor}`
      }}
    >
      <VStack spacing={4}>
        <Box
          w="100%"
          h="200px"
          bg="gray.100"
          borderRadius="md"
          mb={4}
        />
        <Heading 
          as="h3" 
          fontSize="xl"
          mb={2}
        >
          {title}
        </Heading>
        <Text color="gray.600">
          {description}
        </Text>
        <Link
          as={RouterLink}
          to={link}
          color="black"
          fontWeight="500"
          _hover={{ opacity: 0.7 }}
        >
          {linkText}
        </Link>
      </VStack>
    </Box>
  );
};

const StoryGrid: React.FC = () => {
  const stories = [
    {
      title: 'Find your story',
      description: 'Discover stories from writers on any topic',
      link: '/stories',
      linkText: 'Read More'
    },
    {
      title: 'Write your story',
      description: 'Share your thoughts and experiences',
      link: '/write',
      linkText: 'Start Writing'
    },
    {
      title: 'Connect with others',
      description: 'Join a community of storytellers',
      link: '/community',
      linkText: 'Join Now'
    }
  ];

  return (
    <Grid
      templateColumns={{ 
        base: "1fr",
        md: "repeat(3, 1fr)" 
      }}
      gap={8}
      maxW="1200px"
      mx="auto"
      px={4}
      mb={16}
    >
      {stories.map((story, index) => (
        <StoryPreview key={index} {...story} />
      ))}
    </Grid>
  );
};

export default StoryGrid; 