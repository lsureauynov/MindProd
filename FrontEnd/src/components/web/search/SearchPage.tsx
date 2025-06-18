import { useState, useEffect } from 'react';
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
  Spinner,
  Center
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import StoryCard from './components/StoryCard';
import { StoryService } from '../../../services/game/storiesService';
import { searchPageStyles, searchPageProps } from './searchPageStyles';
import type { Story } from './searchTypes';

const SearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const storyService = StoryService.getInstance();
        const storiesData = await storyService.getStories();
        setStories(storiesData);
      } catch (err) {
        setError("Impossible de charger les histoires");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.resume.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
        <Center sx={searchPageStyles.loadingCenter}>
          <Spinner size={searchPageProps.spinner.size} sx={searchPageStyles.spinner} />
        </Center>
    );
  }

  if (error) {
    return (
        <Center sx={searchPageStyles.errorCenter}>
          <Text sx={searchPageStyles.errorText}>{error}</Text>
        </Center>
    );
  }

  return (
      <Container sx={searchPageStyles.container}>
        <VStack spacing={searchPageProps.container.spacing} align={searchPageProps.container.align}>
          <Box>
            <Heading sx={searchPageStyles.header}>Histoires disponibles</Heading>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon sx={searchPageStyles.searchIcon} />
              </InputLeftElement>
              <Input
                  placeholder="Rechercher une histoire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Box>

          <SimpleGrid columns={searchPageProps.grid.columns} spacing={searchPageProps.grid.spacing}>
            {filteredStories.map((story) => (
                <StoryCard key={story.id} story={story} />
            ))}
          </SimpleGrid>

          {filteredStories.length === 0 && (
              <Text sx={searchPageStyles.noResultsText}>
                Aucune histoire ne correspond à votre recherche.
              </Text>
          )}
        </VStack>
      </Container>
  );
};

export default SearchPage; 