import { useEffect, useState, useCallback } from 'react';
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
  Center,
} from '@chakra-ui/react';
import { StoryService } from '../../../services/game/storiesService';
import { SessionService } from '../../../services/game/sessionService';
import { PlayerService } from '../../../services/game/playerService';
import { storyStyles, storyProps } from './storyStyles';
import type { StoryData, PlayerData } from './storyTypes';

const Story: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [story, setStory] = useState<StoryData | null>(null);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const showToast = useCallback(
      (title: string, description: string, status: 'error' | 'warning') => {
        toast({
          title,
          description,
          status,
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      },
      [toast]
  );

  const fetchStory = useCallback(async () => {
    if (!id) return;
    try {
      const storyData = await StoryService.getInstance().getStoryById(id);
      setStory(storyData);
    } catch {
      setError("Impossible de charger l'histoire");
      showToast('Erreur', "Impossible de charger l'histoire", 'error');
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  const fetchPlayer = useCallback(async () => {
    try {
      const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
      setPlayer(currentPlayer);
    } catch (err) {
      console.warn('Aucun joueur connecté ou erreur de récupération.');
    }
  }, []);

  useEffect(() => {
    fetchStory();
    fetchPlayer();
  }, [fetchStory, fetchPlayer]);

  const handlePlay = async () => {
    if (!id || !story) return;

    if (!player) {
      showToast(
          'Connexion requise',
          'Vous devez être connecté pour jouer à cette histoire.',
          'warning'
      );
      return;
    }

    try {
      await SessionService.getInstance().createSession(story.id, player.id);
      navigate(`/game/${id}`);
    } catch {
      showToast('Erreur', 'Impossible de démarrer la partie', 'error');
    }
  };

  if (loading) {
    return (
        <Center sx={storyStyles.loadingCenter}>
          <Spinner size={storyProps.spinner.size} sx={storyStyles.spinner} />
        </Center>
    );
  }

  if (error || !story) {
    return (
        <Center sx={storyStyles.errorCenter}>
          <Text sx={storyStyles.errorText}>{error || 'Histoire non trouvée'}</Text>
        </Center>
    );
  }

  return (
      <Container sx={storyStyles.container}>
        <VStack spacing={storyProps.container.spacing} align={storyProps.container.align}>
          <Box sx={storyStyles.imageContainer}>
            <Image
                src={story.image_url}
                alt={story.title}
                sx={storyStyles.image}
            />
            <Box sx={storyStyles.imageOverlay}>
              <Heading size={storyProps.title.size} sx={storyStyles.title}>
                {story.title}
              </Heading>
            </Box>
          </Box>

          <Box sx={storyStyles.contentBox}>
            <Text sx={storyStyles.contentText}>
              {story.resume}
            </Text>
          </Box>

          {player ? (
            <Button
                size="lg"
                colorScheme="blue"
                onClick={handlePlay}
                sx={storyStyles.playButton}
            >
              Commencer l'enquête
            </Button>
          ) : (
            <Button
                size="lg"
                colorScheme="orange"
                onClick={() => navigate('/login')}
                sx={storyStyles.playButton}
            >
              Se connecter pour jouer
            </Button>
          )}
        </VStack>
      </Container>
  );
};

export default Story;
