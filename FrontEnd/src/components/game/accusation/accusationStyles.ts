export const accusationStyles = {
  mainContainer: {
    as: "main" as const,
    minH: "100vh",
    bg: "gray.900",
    bgGradient: "linear(to-b, gray.900, gray.800)",
    pt: "80px",
  },
  container: {
    maxW: "container.xl",
    py: 8,
  },
  mainStack: {
    spacing: 8,
    align: "stretch" as const,
  },
  headerBox: {
    textAlign: "center" as const,
  },
  title: {
    as: "h1" as const,
    size: "2xl",
    mb: 4,
    bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
    bgClip: "text",
    fontFamily: "heading",
  },
  subtitle: {
    fontSize: "xl",
    color: "whiteAlpha.800",
    fontFamily: "body",
  },
  suspectsGrid: {
    columns: { base: 2, sm: 3, md: 4, lg: 5, xl: 6 },
    spacing: { base: 3, md: 4 },
    pt: 4,
    w: "100%",
  },
  buttonContainer: {
    textAlign: "center" as const,
    pt: 8,
  },
  accuseButton: {
    bgGradient: "linear(to-r, red.600, red.400)",
    color: "white",
    size: "lg",
    px: 12,
    py: 6,
    fontSize: "xl",
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'lg',
      bgGradient: "linear(to-r, red.500, red.300)",
    },
    _active: {
      transform: 'translateY(0)',
      bgGradient: "linear(to-r, red.700, red.500)",
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      _hover: {
        transform: 'none',
        boxShadow: 'none',
      }
    }
  },
};

export const accusationProps = {
  title: "Accusation",
  subtitle: "Sélectionnez le suspect que vous souhaitez accuser",
  accuseButtonText: "Accuser",
}; 