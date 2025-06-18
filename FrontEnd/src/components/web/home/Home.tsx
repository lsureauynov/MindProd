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
  Grid,
  useBreakpointValue,
  Flex
} from '@chakra-ui/react';
import { FaBrain, FaSearch, FaRobot, FaLightbulb } from 'react-icons/fa';
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
    <VStack spacing={4} sx={styles.feature}>
      <IconComponent size={40} color="var(--chakra-colors-brand-primary-500)" />
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
  return (
    <Box as="main" sx={styles.main}>
      <Box sx={styles.particle} animation={pulseAnimation} />

        <Container maxW="container.xl" pt={{ base: 20, md: 32 }} pb={20}>
          <VStack spacing={8} align="center" position="relative">
            <Heading sx={styles.title}>
              Résolvez des Mystères avec l'IA
            </Heading>

            <Text sx={styles.subtitle}>
              Plongez dans des enquêtes captivantes où votre intelligence et l'IA travaillent main dans la main pour résoudre des mystères complexes.
            </Text>

            <Flex gap={4} wrap="wrap" justify="center">
              <Button
                  as={ChakraRouterLink}
                  to="/register"
                  size={buttonSize}
                  sx={styles.ctaPrimary}
              >
                Commencer l'Aventure
              </Button>
              <Button
                  as={ChakraRouterLink}
                  to="/stories"
                  size={buttonSize}
                  sx={styles.ctaSecondary}
              >
                Découvrir les Enquêtes
              </Button>
            </Flex>

            <Grid sx={styles.grid}>
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
