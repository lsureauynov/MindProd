import React, { useEffect, useState, useCallback } from 'react';
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
import { StoryService } from '../../../services/game/storiesService';
import { SessionService } from '../../../services/game/sessionService';
import { PlayerService } from '../../../services/game/playerService';
import type { StoryData, PlayerData } from './storyTypes';
import { useAuthGuard } from '../../../hooks/useAuthGuard';

const Story: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const { isLoading, isAuthenticated } = useAuthGuard();

  if (isLoading) {
    return (
        <Center h="100vh">
          <Spinner size="xl" color="brand.primary.500" />
        </Center>
    );
  }
  const [story, setStory] = useState<StoryData | null>(null);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const showToast = useCallback((title: string, description: string, status: "error" | "warning") => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top"
    });
  }, [toast]);

  const fetchStory = useCallback(async () => {
    if (!id) return;
    try {
      const storyData = await StoryService.getInstance().getStoryById(id);
      setStory(storyData);
    } catch {
      setError("Impossible de charger l'histoire");
      showToast("Erreur", "Impossible de charger l'histoire", "error");
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  const fetchPlayer = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
      setPlayer(currentPlayer);
    } catch (err) {
      console.error("Erreur lors de la récupération du joueur", err);
      showToast("Erreur", "Impossible de récupérer le joueur associé.", "error");
    }
  }, [isAuthenticated, showToast]);

  useEffect(() => {
    fetchStory();
  }, [fetchStory]);

  useEffect(() => {
    fetchPlayer();
  }, [fetchPlayer]);

  const handlePlay = async () => {
    if (!id || !story || !player) return;

    if (!isAuthenticated) {
      showToast("Connexion requise", "Vous devez être connecté pour jouer à cette histoire.", "warning");
      return;
    }

    try {
      await SessionService.getInstance().createSession(story.id, player.id);
      navigate(`/game/${id}`);
    } catch {
      showToast("Erreur", "Impossible de démarrer la partie", "error");
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
                src={story.image_url}
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
              <Heading color="white" size="xl">{story.title}</Heading>
            </Box>
          </Box>

          <Box bg="gray.800" p={6} borderRadius="xl">
            <Text color="whiteAlpha.900" fontSize="lg" whiteSpace="pre-line">
              {story.resume}
            </Text>
          </Box>

          <Button
              size="lg"
              colorScheme="brand.primary"
              onClick={handlePlay}
              width="100%"
              isDisabled={!player}
          >
            {"Commencer l'enquête"}
          </Button>
        </VStack>
      </Container>
  );
};

export default Story;
