import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    // Couleur principale - Un bleu profond évoquant la technologie
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3', // Couleur principale
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    // Couleur secondaire - Un violet mystérieux pour l'aspect enquête
    secondary: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0', // Couleur secondaire
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C',
    },
    // Accent - Un vert néon pour les éléments high-tech
    accent: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
    },
  },
  // Couleurs sémantiques pour l'interface
  interface: {
    success: '#00C853',
    error: '#FF1744',
    warning: '#FFD600',
    info: '#00B0FF',
  },
};

const fonts = {
  heading: '"Orbitron", sans-serif', // Police futuriste pour les titres
  body: '"Inter", sans-serif', // Police moderne et lisible pour le texte
  mono: '"Fira Code", monospace', // Police monospace pour les éléments techniques
};

// Styles globaux
const styles = {
  global: {
    body: {
      bg: 'gray.900',
      color: 'whiteAlpha.900',
    },
    '::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '::-webkit-scrollbar-track': {
      bg: 'blackAlpha.300',
    },
    '::-webkit-scrollbar-thumb': {
      bg: 'brand.primary.500',
      borderRadius: 'full',
    },
  },
};

// Composants personnalisés
const components = {
  Button: {
    baseStyle: {
      borderRadius: 'lg',
      _hover: {
        transform: 'translateY(-2px)',
        boxShadow: 'lg',
      },
      transition: 'all 0.2s',
    },
    variants: {
      solid: {
        bg: 'brand.primary.500',
        color: 'white',
        _hover: {
          bg: 'brand.primary.600',
        },
      },
      outline: {
        borderColor: 'brand.primary.500',
        color: 'brand.primary.500',
        _hover: {
          bg: 'brand.primary.50',
        },
      },
      ghost: {
        color: 'brand.primary.500',
        _hover: {
          bg: 'whiteAlpha.200',
        },
      },
    },
  },
  Card: {
    baseStyle: {
      container: {
        bg: 'gray.800',
        borderRadius: 'xl',
        borderWidth: '1px',
        borderColor: 'whiteAlpha.200',
        overflow: 'hidden',
        transition: 'all 0.2s',
        _hover: {
          transform: 'translateY(-4px)',
          boxShadow: '2xl',
        },
      },
    },
  },
  // Effet de glassmorphisme pour certains conteneurs
  Glass: {
    baseStyle: {
      bg: 'rgba(26, 32, 44, 0.8)',
      backdropFilter: 'blur(10px)',
      borderRadius: 'xl',
      borderWidth: '1px',
      borderColor: 'whiteAlpha.200',
    },
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  fonts,
  styles,
  components,
  config,
});

export default theme; 