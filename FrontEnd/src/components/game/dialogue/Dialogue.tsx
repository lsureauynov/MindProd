import React, { useState, useRef, useEffect } from 'react';
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
import type { Message, DialogueCharacter } from './types';
import type { Clue } from '../gameMenu/types';
import { MessageBubble } from './components/MessageBubble';
import { CluesList } from './components/CluesList';
import { GameService } from '../../../services/game/gameService';
import type {DiscoveredClue} from "../gameMenu/types";

const Dialogue: React.FC = () => {
  const { id: storyId, characterId } = useParams<{ id: string; characterId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [_isCluesExpanded, setIsCluesExpanded] = useState(false);
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
        description: "Paramètres manquants pour le dialogue",
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
        const gameService = GameService.getInstance();
        
        // Charger les informations du personnage
        const characters = await gameService.getSuspects(storyId);
        const character = characters.find(c => c.id === characterId);
        
        if (!character) {
          const witnesses = await gameService.getWitnesses(storyId);
          const witness = witnesses.find(w => w.id === characterId);
          if (witness) {
            setCharacter(witness);
          }
        } else {
          setCharacter(character);
        }
        
        // Charger les indices
        const cluesData = await gameService.getClues(storyId);
        setClues(cluesData);
        
      } catch (err) {
        setError("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storyId, characterId]);

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
      <Center h="100vh">
        <Spinner size="xl" color="brand.primary.500" />
      </Center>
    );
  }

  if (error || !character) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error || "Personnage non trouvé"}</Text>
      </Center>
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
      <Container 
        maxW={containerWidth} 
        h="100%"
        display="flex"
        flexDirection="column"
      >
        <Flex direction="column" h="calc(100vh - 4rem)">
          <Box mb={6}>
            <Button
              leftIcon={<ArrowBackIcon />}
              onClick={handleBackToMenu}
              bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
              color="white"
              size={{ base: "md", md: "lg" }}
              px={{ base: 4, md: 6 }}
              _hover={{
                transform: 'translateX(-4px)',
                bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
              }}
              _active={{
                bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
              }}
            >
              Retour au menu du jeu
            </Button>
          </Box>

          <Box
            bg="gray.800"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="xl"
          >
            <Box position="relative">
              <Image
                src={character.image_url}
                alt={character.name}
                w="full"
                h="300px"
                objectFit="cover"
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="rgba(0, 0, 0, 0.7)"
                p={4}
              >
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="white"
                >
                  {character.name}
                </Text>
              </Box>
            </Box>

            <Box p={6}>
              <Button
                onClick={onToggleCharacterInfo}
                variant="ghost"
                width="full"
                rightIcon={isCharacterInfoExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
                mb={4}
              >
                Informations sur le personnage
              </Button>

              <Collapse in={isCharacterInfoExpanded} animateOpacity>
                <VStack spacing={3} mt={4} align="stretch">
                  <Box>
                    <Text
                      fontSize="sm"
                      color="brand.primary.300"
                      fontWeight="semibold"
                      mb={1}
                    >
                      Personnalité
                    </Text>
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.800"
                    >
                      {character.personality}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontSize="sm"
                      color="brand.secondary.300"
                      fontWeight="semibold"
                      mb={1}
                    >
                      Dans cette affaire
                    </Text>
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.800"
                    >
                      {character.backstory}
                    </Text>
                  </Box>
                </VStack>
              </Collapse>
            </Box>
          </Box>

          <Box
            flex="1"
            bg="gray.800"
            borderRadius="xl"
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            boxShadow="2xl"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bg: 'rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(8px)',
              zIndex: 0,
            }}
          >
            <Box
              flex="1"
              overflowY="auto"
              px={{ base: 3, md: 6 }}
              py={{ base: 4, md: 6 }}
              position="relative"
              zIndex={1}
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                  background: 'rgba(0, 0, 0, 0.2)',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'brand.primary.500',
                  borderRadius: '24px',
                },
              }}
            >
              <VStack spacing={4} align="stretch">
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

            <Box
              borderTopWidth={1}
              borderColor="whiteAlpha.200"
              bg="gray.800"
              p={{ base: 3, md: 4 }}
              boxShadow="0 -2px 10px rgba(0,0,0,0.2)"
              position="relative"
              zIndex={1}
            >
              <HStack spacing={3}>
                <Input
                  value={inputValue}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tapez votre message..."
                  size="lg"
                  bg="gray.700"
                  color="white"
                  borderColor="whiteAlpha.200"
                  h={inputHeight}
                  _hover={{
                    borderColor: "brand.primary.400"
                  }}
                  _focus={{
                    borderColor: "brand.primary.400",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-primary-400)"
                  }}
                  _placeholder={{
                    color: "whiteAlpha.600"
                  }}
                />
                <IconButton
                  aria-label="Send message"
                  icon={<ArrowForwardIcon />}
                  onClick={handleSendMessage}
                  isDisabled={!inputValue.trim()}
                  size="lg"
                  bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                  color="white"
                  h={inputHeight}
                  w={inputHeight}
                  _hover={{
                    bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
                  }}
                  _active={{
                    bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                  }}
                />
              </HStack>
            </Box>
          </Box>

          <Box mt={6}>
            <CluesList 
              clues={clues}
              discoveredClues={discoveredClues}
              onExpandChange={setIsCluesExpanded}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Dialogue; 