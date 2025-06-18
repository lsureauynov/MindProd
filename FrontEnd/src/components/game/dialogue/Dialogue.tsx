import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Input,
  IconButton,
  HStack,
  useBreakpointValue,
  useToast,
  Text,
  Spinner,
  Center,
  Avatar,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, InfoIcon, ViewIcon } from '@chakra-ui/icons';
import { CharacterService } from '../../../services/game/characterService';
import { CluesService } from '../../../services/game/cluesService';
import { SessionService } from '../../../services/game/sessionService';
import { PlayerService } from '../../../services/game/playerService';
import { DialogueService } from '../../../services/game/dialogueService';
import type { Message } from './dialogueTypes';
import type { Clue } from '../gameMenu/gameMenuTypes';
import type { Dialogue, Session, Player, Character } from '../../../types';
import { MessageBubble } from './components/MessageBubble';
import { CluesList } from './components/CluesList';
import type {DiscoveredClue} from "../gameMenu/gameMenuTypes";
import { dialogueStyles, dialogueProps } from './dialogueStyles';

const Dialogue: React.FC = () => {
  const { id: storyId, characterId } = useParams<{ id: string; characterId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const containerWidth = useBreakpointValue({ base: "100%", md: "90%", lg: "80%", xl: "70%" });
  const showCluesPanel = useBreakpointValue({ base: false, lg: true });
  
  const [character, setCharacter] = useState<Character | null>(null);
  const [clues, setClues] = useState<Clue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discoveredClues] = useState<DiscoveredClue[]>([]);
  const [imageError, setImageError] = useState(false);
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  
  const { isOpen: isCharacterOpen, onOpen: onCharacterOpen, onClose: onCharacterClose } = useDisclosure();
  const { isOpen: isCluesOpen, onOpen: onCluesOpen, onClose: onCluesClose } = useDisclosure();
  const convertDialoguesToMessages = (dialogues: Dialogue[]): Message[] => {
    const messages: Message[] = [];
    
    dialogues.forEach((dialogue) => {
      if (dialogue.player_question) {
        messages.push({
          id: `${dialogue.id}-question`,
          content: dialogue.player_question,
          sender: 'user',
          timestamp: new Date(dialogue.created_at),
        });
      }
      
      if (dialogue.character_answer) {
        messages.push({
          id: `${dialogue.id}-answer`,
          content: dialogue.character_answer,
          sender: 'character',
          timestamp: new Date(dialogue.created_at),
        });
      }
    });
    return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  useEffect(() => {
    if (!storyId || !characterId) {
      toast({
        title: "Erreur",
        description: dialogueProps.errorMessages.missingParams,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
      return;
    }

    const token = localStorage.getItem('access');
    if (!token) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour accéder aux dialogues.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }
  }, [storyId, characterId, navigate, toast]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!storyId || !characterId) return;
      
      try {
        setLoading(true);
        
        const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
        setCurrentPlayer(currentPlayer);
        
        let session = await SessionService.getInstance().findSessionByStoryAndPlayer(storyId, currentPlayer.id);
        
        if (!session) {
          toast({
            title: "Erreur",
            description: "Aucune session de jeu trouvée. Retour au menu.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          navigate(`/game/${storyId}`);
          return;
        }
        
        setCurrentSession(session);
        
        const [suspects, witnesses] = await Promise.all([
          CharacterService.getInstance().getSuspectsByStory(storyId),
          CharacterService.getInstance().getWitnessesByStory(storyId),
        ]);
        
        const character = suspects.find(c => c.id === characterId) || witnesses.find(w => w.id === characterId);
        
        if (character) {
          setCharacter(character);
          setImageError(false);
        } else {
          setError("Personnage non trouvé");
          return;
        }
        
        const cluesData = await CluesService.getInstance().getCluesByStories(storyId);
        setClues(cluesData);
        
        const dialogues = await DialogueService.getInstance().getDialogueByCharactersSessionOrderByDate(characterId, session.id);
        const dialogueMessages = convertDialoguesToMessages(dialogues);
        setMessages(dialogueMessages);
        
      } catch (err) {
        setError("Erreur lors du chargement des données");
        toast({
          title: "Erreur",
          description: dialogueProps.errorMessages.loadError,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyId, characterId, toast, navigate]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !currentSession || !currentPlayer || !character) return;
    if (isLoadingMessage) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoadingMessage(true);
    const newUserMessage: Message = {
      id: `temp-user-${Date.now()}`,
      content: userMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      const token = localStorage.getItem('access');
      if (!token) {
        throw new Error('Token d\'authentification manquant');
      }
      
      const dialogue = await DialogueService.getInstance().createDialogue(
        userMessage,
        character.id,
        currentPlayer.id,
        currentSession.id
      );

      const realUserMessage: Message = {
        id: `${dialogue.id}-question`,
        content: userMessage,
        sender: 'user',
        timestamp: new Date(dialogue.created_at),
      };

      const characterResponse: Message = {
        id: `${dialogue.id}-answer`,
        content: dialogue.character_answer || "Je réfléchis à votre question...",
        sender: 'character',
        timestamp: new Date(dialogue.created_at),
      };

      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== newUserMessage.id);
        return [...filtered, realUserMessage, characterResponse];
      });

    } catch (error: any) {
      let errorMessage = "Impossible d'envoyer le message. Veuillez réessayer.";
      
      if (error.response?.status === 401) {
        errorMessage = "Session expirée. Veuillez vous reconnecter.";
        navigate('/login');
      } else if (error.message === 'Token d\'authentification manquant') {
        errorMessage = "Vous devez être connecté pour envoyer un message.";
        navigate('/login');
      }

      toast({
        title: "Erreur",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      
      setMessages(prev => prev.filter(msg => msg.id !== newUserMessage.id));
    } finally {
      setIsLoadingMessage(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoadingMessage) {
      handleSendMessage();
    }
  };

  const handleBackToMenu = () => {
    navigate(`/game/${storyId}`);
  };

  if (loading) {
    return (
      <Center sx={dialogueStyles.loadingContainer}>
        <Spinner sx={dialogueStyles.loadingSpinner} />
      </Center>
    );
  }

  if (error || !character) {
    return (
      <Center sx={dialogueStyles.errorContainer}>
        <Text sx={dialogueStyles.errorText}>
          {error || dialogueProps.errorMessages.characterNotFound}
        </Text>
      </Center>
    );
  }

  return (
    <Box sx={dialogueStyles.mainContainer}>
      <Container sx={dialogueStyles.container(containerWidth)}>
        <Box sx={dialogueStyles.chatHeader}>
          <IconButton
            icon={<ArrowBackIcon />}
            onClick={handleBackToMenu}
            sx={dialogueStyles.backButton}
            aria-label={dialogueProps.backButtonText}
          />
          
          <Box sx={dialogueStyles.characterHeaderInfo}>
            <Avatar
              src={!imageError ? character.image_url : undefined}
              name={character.name}
              sx={dialogueStyles.characterAvatar}
            />
            <VStack spacing={0} align="start">
              <Text sx={dialogueStyles.characterNameHeader}>
                {character.name}
              </Text>
              <Text sx={dialogueStyles.characterStatus}>
                {character.role} • En ligne
              </Text>
            </VStack>
          </Box>
          
          <HStack sx={dialogueStyles.headerActions}>
            <IconButton
              icon={<InfoIcon />}
              onClick={onCharacterOpen}
              sx={dialogueStyles.infoButton}
              aria-label="Informations du personnage"
            />
            {clues.length > 0 && (
              <IconButton
                icon={<ViewIcon />}
                onClick={onCluesOpen}
                sx={dialogueStyles.infoButton}
                aria-label="Indices découverts"
              />
            )}
          </HStack>
        </Box>

        <Box sx={dialogueStyles.characterCard}>
          <Box sx={dialogueStyles.characterImageContainer}>
            {!imageError && character.image_url ? (
              <Image
                src={character.image_url}
                alt={character.name}
                sx={dialogueStyles.characterImage}
                onError={() => setImageError(true)}
                fallback={
                  <Box sx={dialogueStyles.characterImageFallback}>
                    <Avatar
                      name={character.name}
                      size="2xl"
                      sx={dialogueStyles.characterAvatarFallback}
                    />
                  </Box>
                }
              />
            ) : (
              <Box sx={dialogueStyles.characterImageFallback}>
                <Avatar
                  name={character.name}
                  size="2xl"
                  sx={dialogueStyles.characterAvatarFallback}
                />
              </Box>
            )}
            <Box sx={dialogueStyles.characterOverlay}>
              <Text sx={dialogueStyles.characterName}>
                {character.name}
              </Text>
            </Box>
          </Box>

          <Box sx={dialogueStyles.characterInfo}>
            <VStack sx={dialogueStyles.characterInfoStack}>
              <Box w="full">
                <Text sx={dialogueStyles.personalityLabel}>
                  {dialogueProps.personalityLabel}
                </Text>
                <Text sx={dialogueStyles.personalityText}>
                  {character.personality}
                </Text>
              </Box>
              <Box w="full">
                <Text sx={dialogueStyles.backstoryLabel}>
                  {dialogueProps.backstoryLabel}
                </Text>
                <Text sx={dialogueStyles.backstoryText}>
                  {character.backstory}
                </Text>
              </Box>
            </VStack>
          </Box>
        </Box>

        <Box sx={dialogueStyles.chatContainer}>
          <Box
            sx={{
              ...dialogueStyles.messagesContainer,
              ...dialogueStyles.scrollbarStyles,
            }}
          >
            <VStack sx={dialogueStyles.messagesStack}>
              {messages.length === 0 && (
                <Box sx={dialogueStyles.emptyState}>
                  <Text sx={dialogueStyles.emptyStateText}>
                    {dialogueProps.emptyStateText(character.name)}
                  </Text>
                </Box>
              )}
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  characterImage={!imageError ? character.image_url : ''}
                  characterName={character.name}
                />
              ))}
              <div ref={messagesEndRef} />
            </VStack>
          </Box>

          <Box sx={dialogueStyles.inputContainer}>
            <HStack sx={dialogueStyles.inputStack}>
              <Input
                value={inputValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={dialogueProps.inputPlaceholder}
                sx={dialogueStyles.messageInput}
              />
              <IconButton
                aria-label={dialogueProps.sendButtonLabel}
                icon={<ArrowForwardIcon />}
                onClick={handleSendMessage}
                isDisabled={!inputValue.trim() || isLoadingMessage}
                isLoading={isLoadingMessage}
                sx={dialogueStyles.sendButton}
              />
            </HStack>
          </Box>
        </Box>

        {showCluesPanel && clues.length > 0 && (
          <Box sx={dialogueStyles.cluesPanel}>
            <Box sx={dialogueStyles.cluesPanelHeader}>
              <Text sx={dialogueStyles.cluesPanelTitle}>
                Indices découverts
              </Text>
            </Box>
            <Box flex={1} overflowY="auto" p={4}>
              <CluesList
                clues={clues}
                discoveredClues={discoveredClues}
                onClueClick={(clue) => {
                  toast({
                    title: dialogueProps.toastMessages.clueTitle,
                    description: clue.description,
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              />
            </Box>
          </Box>
        )}
      </Container>
      
      <Modal isOpen={isCharacterOpen} onClose={onCharacterClose} size="full">
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader color="white">Informations du personnage</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <VStack spacing={4} align="center" p={4}>
              {!imageError && character.image_url ? (
                <Image
                  src={character.image_url}
                  alt={character.name}
                  maxH="200px"
                  objectFit="cover"
                  borderRadius="lg"
                  onError={() => setImageError(true)}
                  fallback={
                    <Avatar
                      name={character.name}
                      size="2xl"
                      bg="blue.500"
                    />
                  }
                />
              ) : (
                <Avatar
                  name={character.name}
                  size="2xl"
                  bg="blue.500"
                />
              )}
              
              <Text fontSize="xl" fontWeight="bold" color="white">
                {character.name}
              </Text>
              
              <Box w="full">
                <Text fontSize="md" fontWeight="semibold" color="blue.300" mb={2}>
                  Personnalité
                </Text>
                <Text color="gray.300" fontSize="sm">
                  {character.personality}
                </Text>
              </Box>
              
              <Box w="full">
                <Text fontSize="md" fontWeight="semibold" color="violet.300" mb={2}>
                  Histoire
                </Text>
                <Text color="gray.300" fontSize="sm">
                  {character.backstory}
                </Text>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      {clues.length > 0 && (
        <Modal isOpen={isCluesOpen} onClose={onCluesClose} size="full">
          <ModalOverlay />
          <ModalContent bg="gray.900">
            <ModalHeader color="white">Indices découverts</ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody>
              <CluesList
                clues={clues}
                discoveredClues={discoveredClues}
                onClueClick={(clue) => {
                  toast({
                    title: dialogueProps.toastMessages.clueTitle,
                    description: clue.description,
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                  });
                  onCluesClose();
                }}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Dialogue; 