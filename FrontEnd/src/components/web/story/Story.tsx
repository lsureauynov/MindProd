import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Image,
  useToast,
  Spinner,
  Center
} from '@chakra-ui/react';
import { useAuth } from '../../../contexts/AuthContext';
import { GameService } from '../../../services/game/gameService';

interface StoryData {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  isCompleted: boolean;
}

const Story: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const [story, setStory] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const gameService = GameService.getInstance();
        const storyData = await gameService.getStoryById(id);
        setStory(storyData);
      } catch (err) {
        setError("Impossible de charger l'histoire");
        toast({
          title: "Erreur",
          description: "Impossible de charger l'histoire",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, toast]);

  const handlePlay = async () => {
    if (!id) return;

    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour jouer à cette histoire.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    try {
      const gameService = GameService.getInstance();
      await gameService.startNewSession(id);
      navigate(`/game/${id}`);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible de démarrer la partie",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.primary.500" />
      </Center>
    );
  }

  if (error || !story) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error || "Histoire non trouvée"}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box position="relative" h="400px">
          <Image
            src={story.imageUrl}
            alt={story.title}
            objectFit="cover"
            w="100%"
            h="100%"
            borderRadius="xl"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="rgba(0, 0, 0, 0.7)"
            p={6}
            borderBottomRadius="xl"
          >
            <Heading color="white" size="xl">
              {story.title}
            </Heading>
            <Text color="whiteAlpha.800" mt={2}>
              Par {story.author} • {new Date(story.date).toLocaleDateString()}
            </Text>
          </Box>
        </Box>

        <Box bg="gray.800" p={6} borderRadius="xl">
          <Text color="whiteAlpha.900" fontSize="lg" whiteSpace="pre-line">
            {story.content}
          </Text>
        </Box>

        <Button
          size="lg"
          colorScheme="brand.primary"
          onClick={handlePlay}
          width={"100%"}
        >
          {story.isCompleted ? "Rejouer l'histoire" : "Commencer l'enquête"}
        </Button>
      </VStack>
    </Container>
  );
};

export default Story; 