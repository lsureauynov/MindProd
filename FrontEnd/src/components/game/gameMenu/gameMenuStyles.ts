export const gameMenuStyles = {
  mainContainer: {
    minH: "100vh",
    bg: "gray.900",
    bgGradient: "linear(to-b, gray.900, gray.800)",
    py: 8,
  },
  container: {
    maxW: "container.xl",
  },
  mainStack: {
    spacing: 8,
    align: "stretch" as const,
  },
  headerBox: {
    textAlign: "center" as const,
    mb: 4,
  },
  title: {
    as: "h1" as const,
    size: "xl",
    mb: 8,
    bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
    bgClip: "text",
    fontFamily: "heading",
  },
  headerStack: {
    spacing: 4,
    align: "center" as const,
  },
  accuseButton: {
    bgGradient: "linear(to-r, red.600, red.400)",
    color: "white",
    size: "lg",
    px: 8,
    py: 3,
    borderRadius: "xl",
    fontWeight: "bold",
    _hover: {
      transform: 'translateY(-2px)',
      boxShadow: 'xl',
      bgGradient: "linear(to-r, red.500, red.300)",
    },
    _active: {
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
  contentStack: {
    spacing: 10,
    align: "stretch" as const,
  },
  sectionContainer: {
    bg: "gray.800",
    borderRadius: "xl",
    p: 6,
    border: "1px solid",
    borderColor: "gray.700",
    _hover: {
      borderColor: "gray.600",
    },
    transition: "all 0.2s",
  },
  sectionHeading: {
    as: "h2" as const,
    size: "lg",
    fontFamily: "heading",
    mb: 6,
    textAlign: "center" as const,
    position: "relative" as const,
    _after: {
      content: '""',
      position: "absolute",
      bottom: "-8px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "60px",
      height: "3px",
      borderRadius: "full",
    }
  },
  suspectsHeading: {
    color: "brand.primary.400",
    _after: {
      bg: "brand.primary.500",
    }
  },
  witnessesHeading: {
    color: "brand.secondary.400",
    _after: {
      bg: "brand.secondary.500",
    }
  },
  cluesHeading: {
    color: "brand.accent.400",
    _after: {
      bg: "brand.accent.500",
    }
  },
  // Grilles adaptatives basées sur le nombre d'éléments
  gridBase: {
    gap: { base: 4, md: 6 },
    justifyItems: "center",
    alignItems: "start",
    w: "100%",
  },
  // Pour 1 élément
  grid1: {
    templateColumns: '1fr',
    maxW: "400px",
    mx: "auto",
  },
  // Pour 2 éléments
  grid2: {
    templateColumns: { base: '1fr', sm: 'repeat(2, 1fr)' },
    maxW: "800px",
    mx: "auto",
  },
  // Pour 3 éléments
  grid3: {
    templateColumns: { 
      base: '1fr', 
      sm: 'repeat(2, 1fr)', 
      md: 'repeat(3, 1fr)' 
    },
  },
  // Pour 4+ éléments
  grid4Plus: {
    templateColumns: { 
      base: '1fr', 
      sm: 'repeat(2, 1fr)', 
      md: 'repeat(3, 1fr)', 
      lg: 'repeat(4, 1fr)',
      xl: 'repeat(auto-fit, minmax(280px, 1fr))'
    },
  },
  // Styles pour les cartes
  cardWrapper: {
    w: "100%",
    maxW: { base: "100%", sm: "320px", md: "300px" },
    minW: { sm: "250px" },
    transition: "all 0.3s",
    _hover: {
      transform: "translateY(-4px)",
    }
  },
  suspectCard: {
    position: "relative" as const,
    zIndex: 2,
  },
  // États vides
  emptyState: {
    textAlign: "center" as const,
    py: 8,
    color: "gray.500",
    fontStyle: "italic",
  },
  emptyStateIcon: {
    fontSize: "3xl",
    mb: 2,
  },
  // Statistiques
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    mb: 4,
    flexWrap: "wrap" as const,
  },
  statBox: {
    bg: "gray.700",
    px: 4,
    py: 2,
    borderRadius: "lg",
    textAlign: "center" as const,
    minW: "80px",
  },
  statNumber: {
    fontSize: "xl",
    fontWeight: "bold",
    color: "white",
  },
  statLabel: {
    fontSize: "sm",
    color: "gray.400",
  },
  errorBox: {
    textAlign: "center" as const,
    py: 10,
    minH: "100vh",
    bg: "gray.900",
    color: "red.400",
  },
  loadingBox: {
    textAlign: "center" as const,
    py: 10,
    minH: "100vh",
    bg: "gray.900",
    color: "brand.primary.400",
  },
  errorText: {
    fontSize: "xl",
  },
  spinner: {
    size: "xl",
    thickness: "4px",
    speed: "0.65s",
  },
};

// Fonction utilitaire pour déterminer le style de grille
export const getGridStyle = (itemCount: number) => {
  if (itemCount === 0) return {};
  if (itemCount === 1) return { ...gameMenuStyles.gridBase, ...gameMenuStyles.grid1 };
  if (itemCount === 2) return { ...gameMenuStyles.gridBase, ...gameMenuStyles.grid2 };
  if (itemCount === 3) return { ...gameMenuStyles.gridBase, ...gameMenuStyles.grid3 };
  return { ...gameMenuStyles.gridBase, ...gameMenuStyles.grid4Plus };
};

export const gameMenuProps = {
  accuseButton: {
    noAttemptsText: "Plus d'essais disponibles",
    defaultText: "Faire une accusation",
  },
  sections: {
    suspects: "Suspects",
    witnesses: "Témoins", 
    clues: "Indices",
  },
  title: "Mode Investigation",
  emptyStates: {
    suspects: "Aucun suspect disponible",
    witnesses: "Aucun témoin disponible",
    clues: "Aucun indice disponible",
  },
  stats: {
    suspects: "Suspects",
    witnesses: "Témoins",
    clues: "Indices",
    lives: "Vies",
  },
  errorMessages: {
    missingId: "ID du jeu manquant. Impossible de charger le jeu.",
    loadError: "Une erreur est survenue lors du chargement du jeu.",
  },
}; 