import { useEffect, useState } from 'react';
import { Box, VStack, Spinner, Center, Text } from '@chakra-ui/react';
import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';
import { StoryService } from '../../../services/game/storiesService';
import type { Story } from './searchTypes';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      setError(null);
      try {
        const service = StoryService.getInstance();
        const data = await service.getStories();
        const formattedStories: Story[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          resume: item.resume,
          author: item.author,
          imageUrl: item.image_url,
        }));
        setStories(formattedStories);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les histoires.");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
      <Box as="main" minH="100vh" bg="gray.50" pt="80px">
        <VStack spacing={8} align="stretch">
          <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
          />

          {loading ? (
              <Center py={20}>
                <Spinner size="xl" />
              </Center>
          ) : error ? (
              <Center py={20}>
                <Text color="red.500">{error}</Text>
              </Center>
          ) : (
              <SearchResults searchQuery={searchQuery} stories={stories} />
          )}
        </VStack>
      </Box>
  );
};

export default Search;
