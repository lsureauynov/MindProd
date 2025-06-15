import {
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import StoryCard from './StoryCard';
import type { SearchResultsProps } from './../searchTypes';

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery, stories }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const filteredStories = stories.filter(story =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.resume.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
          ))}
        </SimpleGrid>

        {filteredStories.length === 0 && (
            <Text textAlign="center" fontSize="lg" color={textColor}>
              Aucune histoire trouvée pour votre recherche.
            </Text>
        )}
      </Container>
  );
};

export default SearchResults;
