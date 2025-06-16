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
  Button,
  useBreakpointValue,
  Flex,
  useToast,
  Text,
  Collapse,
  Image,
  useDisclosure,
  Spinner,
  Center
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { CharacterService } from '../../../services/game/characterService';
import { CluesService } from '../../../services/game/cluesService';
import { SessionService } from '../../../services/game/sessionService';
import { PlayerService } from '../../../services/game/playerService';
import type { Message, DialogueCharacter } from './dialogueTypes';
import type { Clue } from '../gameMenu/gameMenuTypes';
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
  const { isOpen: isCharacterInfoExpanded, onToggle: onToggleCharacterInfo } = useDisclosure();
  
  const containerWidth = useBreakpointValue({ base: "100%", md: "90%", lg: "80%", xl: "70%" });
  const inputHeight = useBreakpointValue({ base: "60px", md: "70px" });
  
  const [character, setCharacter] = useState<DialogueCharacter | null>(null);
  const [clues, setClues] = useState<Clue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discoveredClues] = useState<DiscoveredClue[]>([]);

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
  }, [storyId, characterId, navigate, toast]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!storyId || !characterId) return;
      
      try {
        setLoading(true);
        
        // Récupérer le joueur actuel
        const currentPlayer = await PlayerService.getInstance().getCurrentPlayer();
        
        // Chercher la session existante pour cette histoire et ce joueur
        let session = await SessionService.getInstance().findSessionByStoryAndPlayer(storyId, currentPlayer.id);
        
        if (!session) {
          // Si aucune session n'existe, rediriger vers le menu du jeu
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
        
        // Charger les informations du personnage
        const [suspects, witnesses] = await Promise.all([
          CharacterService.getInstance().getSuspectsByStory(storyId),
          CharacterService.getInstance().getWitnessesByStory(storyId),
        ]);
        
        const character = suspects.find(c => c.id === characterId) || witnesses.find(w => w.id === characterId);
        
        if (character) {
          setCharacter(character);
        } else {
          setError("Personnage non trouvé");
          return;
        }
        
        // Charger les indices
        const cluesData = await CluesService.getInstance().getCluesByStories(storyId);
        setClues(cluesData);
        
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

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simuler une réponse du personnage après 1 seconde
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je ne peux pas en dire plus pour le moment...",
        sender: 'character',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
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
        <Flex sx={dialogueStyles.mainFlex}>
          <Box sx={dialogueStyles.backButtonContainer}>
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={handleBackToMenu}
              sx={dialogueStyles.backButton}
            >
              {dialogueProps.backButtonText}
            </Button>
          </Box>

          <Box sx={dialogueStyles.characterCard}>
            <Box sx={dialogueStyles.characterImageContainer}>
              <Image
                src={character.image_url}
                alt={character.name}
                sx={dialogueStyles.characterImage}
              />
              <Box sx={dialogueStyles.characterOverlay}>
                <HStack sx={dialogueStyles.characterHeader}>
                  <Text sx={dialogueStyles.characterName}>
                    {character.name}
                  </Text>
                  <IconButton
                    aria-label={dialogueProps.toggleButtonLabel}
                    icon={isCharacterInfoExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    onClick={onToggleCharacterInfo}
                    sx={dialogueStyles.toggleButton}
                  />
                </HStack>
              </Box>
            </Box>

            <Collapse in={isCharacterInfoExpanded} animateOpacity>
              <Box sx={dialogueStyles.characterInfo}>
                <VStack sx={dialogueStyles.characterInfoStack}>
                  <Box>
                    <Text sx={dialogueStyles.personalityLabel}>
                      {dialogueProps.personalityLabel}
                    </Text>
                    <Text sx={dialogueStyles.personalityText}>
                      {character.personality}
                    </Text>
                  </Box>
                  <Box>
                    <Text sx={dialogueStyles.backstoryLabel}>
                      {dialogueProps.backstoryLabel}
                    </Text>
                    <Text sx={dialogueStyles.backstoryText}>
                      {character.backstory}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Collapse>
          </Box>

          <Box sx={dialogueStyles.chatContainer}>
            <Box
              flex="1"
              overflowY="auto"
              p={4}
              css={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'rgba(255, 255, 255, 0.5)',
                },
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
                    characterImage={character.image_url}
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
                  h={inputHeight}
                />
                <IconButton
                  aria-label={dialogueProps.sendButtonLabel}
                  icon={<ArrowForwardIcon />}
                  onClick={handleSendMessage}
                  isDisabled={!inputValue.trim()}
                  sx={dialogueStyles.sendButton}
                />
              </HStack>
            </Box>
          </Box>

          {clues.length > 0 && (
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
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Dialogue; 