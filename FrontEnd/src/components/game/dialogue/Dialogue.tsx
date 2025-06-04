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
  Avatar,
  Text,
  Collapse,
  Icon,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import type { Message, DialogueCharacter } from './types';
import type { Clue } from '../gameMenu/types';
import { MessageBubble } from './components/MessageBubble';
import { CluesList } from './components/CluesList';

const Dialogue: React.FC = () => {
  const { id, characterId } = useParams<{ id: string; characterId: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isCluesExpanded, setIsCluesExpanded] = useState(false);
  const [isCharacterInfoExpanded, setIsCharacterInfoExpanded] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const containerWidth = useBreakpointValue({ base: "100%", md: "90%", lg: "80%", xl: "70%" });
  const inputHeight = useBreakpointValue({ base: "60px", md: "70px" });
  
  useEffect(() => {
    if (!id || !characterId) {
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
  }, [id, characterId, navigate, toast]);
  
  // Mock data - À remplacer par des appels API réels
  const mockCharacter: DialogueCharacter = {
    id: characterId || '',
    name: characterId === '1' ? 'Jean Dupont' : 'Marie Martin',
    image: characterId === '1' 
      ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e'
      : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    type: 'suspect',
    description: characterId === '1'
      ? 'Un homme d\'affaires ambitieux et charismatique, connu pour son tempérament impulsif.'
      : 'Une comptable méticuleuse avec un sens aigu du détail et une réputation d\'intégrité.',
    backstory: characterId === '1'
      ? 'Associé principal de la victime dans plusieurs projets immobiliers controversés. A été vu en train de se disputer violemment avec elle la veille du drame.'
      : 'A découvert des irrégularités dans les comptes de la société quelques jours avant le meurtre. Menacée de licenciement par la victime.'
  };

  const mockClues: Clue[] = [
    { id: '1', name: 'Empreintes', description: 'Des empreintes digitales ont été trouvées sur la poignée de porte.' },
    { id: '2', name: 'Note', description: 'Une note mystérieuse a été découverte dans la chambre.' },
  ];

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
    navigate(`/game/${id}`);
  };

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
            borderWidth="1px"
            borderColor="whiteAlpha.200"
            mb={4}
            overflow="hidden"
          >
            <Box
              p={4}
              bg="rgba(26, 32, 44, 0.8)"
              backdropFilter="blur(8px)"
              cursor="pointer"
              onClick={() => setIsCharacterInfoExpanded(!isCharacterInfoExpanded)}
            >
              <Flex align="center" justify="space-between">
                <HStack spacing={4}>
                  <Avatar
                    size="lg"
                    name={mockCharacter.name}
                    src={mockCharacter.image}
                  />
                  <Box>
                    <Text
                      fontSize="xl"
                      fontWeight="bold"
                      color="whiteAlpha.900"
                    >
                      {mockCharacter.name}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="whiteAlpha.700"
                      textTransform="capitalize"
                    >
                      {mockCharacter.type}
                    </Text>
                  </Box>
                </HStack>
                <Icon
                  as={isCharacterInfoExpanded ? ChevronUpIcon : ChevronDownIcon}
                  w={6}
                  h={6}
                  color="whiteAlpha.600"
                />
              </Flex>
              
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
                      {mockCharacter.description}
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
                      {mockCharacter.backstory}
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
                    characterImage={mockCharacter.image}
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
              clues={mockClues} 
              onExpandChange={setIsCluesExpanded}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Dialogue; 