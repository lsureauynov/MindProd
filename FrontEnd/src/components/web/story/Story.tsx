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
import type { Session } from '../../../types';

const Story: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [story, setStory] = useState<StoryData | null>(null);
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [existingSession, setExistingSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkingSession, setCheckingSession] = useState(false);

  const showToast = useCallback(
      (title: string, description: string, status: 'error' | 'warning' | 'success') => {
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
      return currentPlayer;
    } catch (err) {

      return null;
    }
  }, []);

  const checkExistingSession = useCallback(async (storyId: string, playerId: string) => {
    try {
      setCheckingSession(true);
      const session = await SessionService.getInstance().findSessionByStoryAndPlayer(storyId, playerId);
      
      // Ne considérer que les sessions non terminées
      if (session && session.status !== 'finished') {
        setExistingSession(session);

      } else {
        setExistingSession(null);
        
      }
    } catch (error) {
      
      setExistingSession(null);
    } finally {
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    const initializeData = async () => {
      await fetchStory();
      const currentPlayer = await fetchPlayer();
      
      // Vérifier s'il existe une session pour cette histoire et ce joueur
      if (id && currentPlayer) {
        await checkExistingSession(id, currentPlayer.id);
      }
    };

    initializeData();
  }, [id, fetchStory, fetchPlayer, checkExistingSession]);

  const handlePlay = async () => {
    if (!id || !story || !player) return;

    try {
      if (existingSession) {
        // Si une session existe, naviguer directement vers le jeu
  
        navigate(`/game/${id}`);
        showToast(
          'Session reprise',
          'Vous continuez votre enquête en cours.',
          'success'
        );
      } else {
        // Créer une nouvelle session

        await SessionService.getInstance().createSession(story.id, player.id);
        navigate(`/game/${id}`);
        showToast(
          'Nouvelle enquête',
          'Une nouvelle enquête a commencé !',
          'success'
        );
      }
          } catch (error) {
      showToast('Erreur', 'Impossible de démarrer la partie', 'error');
    }
  };

  const getButtonText = () => {
    if (checkingSession) return 'Vérification...';
    if (existingSession) {
      if (existingSession.status === 'started') return 'Continuer l\'enquête';
      if (existingSession.status === 'playing') return 'Reprendre l\'enquête';
    }
    return 'Commencer l\'enquête';
  };

  const getButtonColor = () => {
    if (existingSession) return 'green';
    return 'blue';
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

          {existingSession && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Text fontSize="sm" color="green.400" fontWeight="medium">
                Enquête en cours • {existingSession.remaining_lives} vie(s) restante(s)
              </Text>
            </Box>
          )}

          {player ? (
            <Button
                size="lg"
                colorScheme={getButtonColor()}
                onClick={handlePlay}
                sx={storyStyles.playButton}
                isLoading={checkingSession}
                loadingText="Vérification..."
            >
              {getButtonText()}
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
