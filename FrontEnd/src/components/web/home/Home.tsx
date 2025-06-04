import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Grid,
  useBreakpointValue,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FaBrain, FaSearch, FaRobot, FaLightbulb } from 'react-icons/fa';

// Animation du pulse pour l'effet AI
const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 0.5; }
`;

const Feature = ({ icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <VStack
    spacing={4}
    p={6}
    bg="rgba(26, 32, 44, 0.8)"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="whiteAlpha.200"
    backdropFilter="blur(10px)"
    transition="all 0.3s"
    _hover={{
      transform: 'translateY(-8px)',
      boxShadow: '2xl',
    }}
  >
    <Icon as={icon} boxSize={10} color="brand.primary.500" />
    <Heading size="md" fontFamily="heading">
      {title}
    </Heading>
    <Text textAlign="center" color="whiteAlpha.900">
      {description}
    </Text>
  </VStack>
);

const Home: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const pulseAnimation = `${pulse} 3s infinite`;

  return (
    <Box
      as="main"
      minH="100vh"
      bg="gray.900"
      bgGradient="radial-gradient(circle at 50% 50%, rgba(66, 153, 225, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%)"
      position="relative"
      overflow="hidden"
    >
      {/* Effet de particules AI */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="600px"
        height="600px"
        borderRadius="full"
        bg="brand.primary.500"
        filter="blur(150px)"
        opacity="0.15"
        animation={pulseAnimation}
      />

      <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={20}>
        <VStack spacing={8} align="center" position="relative">
          <Heading
            as="h1"
            size={{ base: '2xl', md: '3xl', lg: '4xl' }}
            textAlign="center"
            fontFamily="heading"
            bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
            bgClip="text"
            letterSpacing="tight"
          >
            Résolvez des Mystères avec l'IA
          </Heading>

          <Text
            fontSize={{ base: 'lg', md: 'xl' }}
            textAlign="center"
            color="whiteAlpha.900"
            maxW="800px"
          >
            Plongez dans des enquêtes captivantes où votre intelligence et l'IA travaillent main dans la main pour résoudre des mystères complexes.
          </Text>

          <Flex gap={4} wrap="wrap" justify="center">
            <Button
              as={RouterLink}
              to="/register"
              size={buttonSize}
              colorScheme="blue"
              bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
              _hover={{
                bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                transform: "translateY(-2px)",
              }}
            >
              Commencer l'Aventure
            </Button>
            <Button
              as={RouterLink}
              to="/stories"
              size={buttonSize}
              variant="outline"
              borderColor="brand.primary.500"
              color="brand.primary.500"
              _hover={{
                bg: "whiteAlpha.100",
                transform: "translateY(-2px)",
              }}
            >
              Découvrir les Enquêtes
            </Button>
          </Flex>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
            gap={8}
            w="full"
            mt={16}
          >
            <Feature
              icon={FaBrain}
              title="IA Avancée"
              description="Une intelligence artificielle sophistiquée qui analyse vos décisions et s'adapte à votre style d'enquête."
            />
            <Feature
              icon={FaSearch}
              title="Enquêtes Complexes"
              description="Des mystères élaborés avec de multiples suspects, indices et fausses pistes à explorer."
            />
            <Feature
              icon={FaRobot}
              title="Assistant Virtuel"
              description="Un partenaire IA qui vous guide et vous aide à développer vos compétences de détective."
            />
            <Feature
              icon={FaLightbulb}
              title="Résolution Intuitive"
              description="Une interface immersive qui rend l'expérience d'enquête fluide et naturelle."
            />
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home; 