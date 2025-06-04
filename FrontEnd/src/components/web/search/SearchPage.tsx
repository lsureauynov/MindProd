import React, { useState } from 'react';
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
  Icon
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import StoryCard from './components/StoryCard';

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
    <Box 
      as="main" 
      minH="100vh" 
      bg="gray.900"
      bgGradient="linear(to-b, gray.900, gray.800)"
      py={8}
    >
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          {/* En-tête et barre de recherche */}
          <Box textAlign="center" mb={8}>
            <Heading 
              as="h1" 
              size="2xl" 
              mb={4}
              bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
              bgClip="text"
              fontFamily="heading"
            >
              Découvrez les Enquêtes
            </Heading>
            <Text 
              fontSize="xl" 
              color="whiteAlpha.800" 
              mb={8}
              fontFamily="body"
            >
              Plongez dans un monde de mystères et d'énigmes
            </Text>
            
            <InputGroup maxW="600px" mx="auto">
              <InputLeftElement pointerEvents="none">
                <Icon as={SearchIcon} color="brand.primary.400" />
              </InputLeftElement>
              <Input
                placeholder="Rechercher par titre, résumé ou auteur..."
                size="lg"
                bg="gray.800"
                color="white"
                borderColor="whiteAlpha.200"
                _hover={{
                  borderColor: "brand.primary.400"
                }}
                _focus={{
                  borderColor: "brand.primary.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary-400)"
                }}
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </Box>

          {/* Grille des stories */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {filteredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </SimpleGrid>

          {/* Message si aucun résultat */}
          {filteredStories.length === 0 && (
            <Text 
              textAlign="center" 
              fontSize="lg" 
              color="whiteAlpha.800"
              fontStyle="italic"
            >
              Aucune enquête ne correspond à votre recherche.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default SearchPage; 