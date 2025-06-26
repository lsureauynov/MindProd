import React, { forwardRef } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import type { LinkProps as RouterLinkProps} from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Grid,
  useBreakpointValue,
  Icon,
  Badge,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { 
  FaBrain, 
  FaSearch, 
  FaRobot, 
  FaLightbulb, 
  FaPlay, 
  FaArrowRight,
  FaGamepad,
} from 'react-icons/fa';
import { styles, pulseAnimation } from './Homestyles';
import type { IconType } from 'react-icons';

const ChakraRouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
    <RouterLink ref={ref} {...props} />
));
ChakraRouterLink.displayName = 'ChakraRouterLink';

type FeatureProps = {
  icon: IconType;
  title: string;
  description: string;
};

const Feature = ({ icon: IconComponent, title, description }: FeatureProps) => (
  <Card sx={styles.featureCard}>
    <CardBody>
      <VStack spacing={4} align="center">
        <Box sx={styles.featureIconBox}>
          <Icon as={IconComponent} sx={styles.featureIcon} />
        </Box>
        <Heading size="md" textAlign="center" color="white">
          {title}
        </Heading>
        <Text textAlign="center" color="whiteAlpha.800" fontSize="sm">
          {description}
        </Text>
      </VStack>
    </CardBody>
  </Card>
);

const Home: React.FC = () => {
  const buttonSize = useBreakpointValue({ base: 'md', md: 'lg' });
  const heroSpacing = useBreakpointValue({ base: 6, md: 8 });
  
  return (
    <Box as="main" sx={styles.main}>
      {/* Particules d'arrière-plan */}
      <Box sx={styles.particle} animation={pulseAnimation} />
      <Box sx={styles.particleSecondary} />
      
      {/* Section Hero */}
      <Container maxW="container.xl" pt={{ base: 16, md: 24 }} pb={12}>
        <VStack spacing={heroSpacing} align="center" position="relative">
          <VStack spacing={4}>
            <Badge sx={styles.heroBadge}>
              <Icon as={FaGamepad} mr={2} />
              Expérience Interactive avec IA
            </Badge>
            
            <Heading sx={styles.heroTitle}>
              Résolvez des Mystères
              <Text as="span" sx={styles.heroTitleAccent}>
                {" "}avec l'Intelligence Artificielle
              </Text>
            </Heading>

            <Text sx={styles.heroSubtitle}>
              Plongez dans des enquêtes captivantes où votre intelligence et l'IA 
              travaillent main dans la main pour résoudre des mystères complexes. 
              Une expérience immersive unique vous attend.
            </Text>
          </VStack>

          <HStack spacing={4} flexWrap="wrap" justify="center">
            <Button
              as={ChakraRouterLink}
              to="/register"
              size={buttonSize}
              sx={styles.ctaPrimary}
              rightIcon={<FaPlay />}
            >
              Commencer l'Aventure
            </Button>
            <Button
              as={ChakraRouterLink}
              to="/stories"
              size={buttonSize}
              sx={styles.ctaSecondary}
              rightIcon={<FaArrowRight />}
            >
              Découvrir les Enquêtes
            </Button>
          </HStack>
        </VStack>
      </Container>

      {/* Section Fonctionnalités */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color="white">
              Pourquoi Choisir MindProd ?
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800" maxW="600px">
              Une plateforme innovante qui combine le frisson de l'enquête 
              avec la puissance de l'intelligence artificielle.
            </Text>
          </VStack>

          <Grid sx={styles.featuresGrid}>
            <Feature
              icon={FaBrain}
              title="IA Avancée"
              description="Une intelligence artificielle qui analyse vos décisions et s'adapte à votre style d'enquête pour une expérience personnalisée."
            />
            <Feature
              icon={FaSearch}
              title="Enquêtes Complexes"
              description="Des mystères élaborés avec de multiples suspects, indices cachés et fausses pistes à explorer dans des univers immersifs."
            />
            <Feature
              icon={FaRobot}
              title="Assistant Virtuel"
              description="Un partenaire IA intelligent qui vous guide, vous donne des indices subtils et vous aide à développer vos compétences de détective."
            />
            <Feature
              icon={FaLightbulb}
              title="Interface Intuitive"
              description="Une expérience utilisateur fluide et naturelle avec des interactions immersives qui vous plongent au cœur de l'enquête."
            />
          </Grid>
        </VStack>
      </Container>

      {/* Section Call-to-Action Final */}
      <Container maxW="container.xl" py={16}>
        <Box sx={styles.finalCta}>
          <VStack spacing={6} textAlign="center">
            <Heading size="xl" color="white">
              Prêt à devenir détective ?
            </Heading>
            <Text fontSize="lg" color="whiteAlpha.800" maxW="600px">
              Découvrez une nouvelle façon de résoudre des mystères grâce à l'intelligence artificielle. 
              Votre première enquête vous attend.
            </Text>
            <Button
              as={ChakraRouterLink}
              to="/register"
              size="lg"
              sx={styles.finalCtaButton}
            >
              Commencer Maintenant
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
