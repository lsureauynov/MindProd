import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  useToast,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useAuth } from '../../../contexts/AuthContext';
import StoryHeader from './components/StoryHeader';
import StoryContent from './components/StoryContent';

interface StoryData {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  isCompleted?: boolean;
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
      try {
        setLoading(true);
        // Simuler un appel API
        const mockStory: StoryData = {
          id: id || '1',
          title: "Le Mystère du Manoir",
          content: "C'était une nuit sombre et orageuse...",
          author: "Jane Doe",
          date: "2024-03-20",
          imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
          isCompleted: true // À remplacer par la vraie donnée de l'API
        };
        
        setStory(mockStory);
        setError(null);
      } catch (err) {
        setError("Impossible de charger l'histoire");
        toast({
          title: "Erreur",
          description: "Impossible de charger l'histoire",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
          variant: "solid",
          bg: "red.500",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, toast]);

  const handlePlay = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour jouer à cette histoire.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "solid",
        bg: "orange.500",
      });
      return;
    }
    navigate(`/game/${id}`);
  };

  if (error) {
    return (
      <Box 
        as="main" 
        minH="100vh" 
        bg="gray.900"
        bgGradient="linear(to-b, gray.900, gray.800)"
        py={8}
      >
        <Container maxW="container.xl">
          <Alert 
            status="error" 
            variant="solid" 
            bg="red.500" 
            color="white"
            borderRadius="xl"
          >
            <AlertIcon />
            <AlertTitle mr={2}>Erreur!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Container>
      </Box>
    );
  }

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
          {loading ? (
            <>
              <Skeleton 
                height="60px" 
                startColor="gray.700" 
                endColor="gray.600"
              />
              <Skeleton 
                height="24px"
                startColor="gray.700" 
                endColor="gray.600"
              />
              <Skeleton 
                height="400px"
                startColor="gray.700" 
                endColor="gray.600"
              />
            </>
          ) : story ? (
            <>
              <StoryHeader
                title={story.title}
                isAuthenticated={isAuthenticated}
                onPlay={handlePlay}
                isCompleted={story.isCompleted}
              />
              <StoryContent
                content={story.content}
                imageUrl={story.imageUrl}
                title={story.title}
                author={story.author}
                date={story.date}
              />
            </>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default Story; 