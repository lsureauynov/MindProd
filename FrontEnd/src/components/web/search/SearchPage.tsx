import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Icon,
  Spinner,
  Center
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import StoryCard from './components/StoryCard';
import { GameService } from '../../../services/game/gameService';

// Type pour une story
interface Story {
  id: string;
  title: string;
  resume: string;
  author: string;
  imageUrl?: string;
}

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const gameService = GameService.getInstance();
        const storiesData = await gameService.getStories();
        setStories(storiesData);
      } catch (err) {
        setError("Impossible de charger les histoires");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Filtrer les stories en fonction de la recherche
  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.resume.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.primary.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Histoires disponibles</Heading>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchIcon} color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Rechercher une histoire..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </SimpleGrid>

        {filteredStories.length === 0 && (
          <Text textAlign="center" color="gray.500">
            Aucune histoire ne correspond à votre recherche.
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default SearchPage; 