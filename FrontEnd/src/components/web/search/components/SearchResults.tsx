import React from 'react';
import {
  Container,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import StoryCard from './StoryCard';

interface Story {
  id: string;
  title: string;
  resume: string;
  author: string;
  imageUrl?: string;
}

interface SearchResultsProps {
  searchQuery: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Données temporaires pour les stories (à remplacer par les vraies données de l'API)
  const stories: Story[] = [
    {
      id: '1',
      title: 'Le Mystère de la Chambre 23',
      resume: 'Un corps est découvert dans une chambre d\'hôtel verrouillée de l\'intérieur. Aucune trace d\'effraction, aucune arme du crime. Comment le meurtrier a-t-il pu s\'échapper ?',
      author: 'Inspector Sarah Martin',
      imageUrl: 'https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?q=80'
    },
    {
      id: '2',
      title: 'Les Disparues du Lac Noir',
      resume: 'Trois femmes ont disparu près du Lac Noir en l\'espace d\'un mois. La seule chose qui les relie : une mystérieuse carte de tarot retrouvée sur les lieux.',
      author: 'Detective Mike Chen',
      imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80'
    },
    {
      id: '3',
      title: 'Le Code du Tueur',
      resume: 'Un serial killer laisse des messages codés sur ses scènes de crime. La course contre la montre est lancée pour déchiffrer son prochain mouvement.',
      author: 'Lieutenant Alex Thompson',
      imageUrl: 'https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?q=80'
    },
  ];

  // Filtrer les stories en fonction de la recherche
  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.resume.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxW="container.xl">
      {/* Grille des stories */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </SimpleGrid>

      {/* Message si aucun résultat */}
      {filteredStories.length === 0 && (
        <Text textAlign="center" fontSize="lg" color={textColor}>
          Aucune histoire trouvée pour votre recherche.
        </Text>
      )}
    </Container>
  );
};

export default SearchResults; 