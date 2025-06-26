export const dialogueStyles = {
  mainContainer: {
    as: "main" as const,
    minH: "100vh",
    bg: "gray.900",
    bgGradient: "linear(to-b, gray.900, gray.800)",
    py: 0,
  },
  container: (containerWidth: string | undefined) => ({
    maxW: containerWidth,
    h: "100vh",
    display: "grid",
    gridTemplateColumns: { base: "1fr", lg: "350px 1fr 300px" },
    gridTemplateRows: { base: "auto 1fr", lg: "auto 1fr" },
    gap: 0,
    gridTemplateAreas: {
      base: `"header" "chat"`,
      lg: `"header header header" "character chat clues"`
    },
    p: 0,
  }),
  mainFlex: {
    direction: "column" as const,
    h: "100vh",
    flex: 1,
  },
  // Header avec infos du personnage et bouton retour
  chatHeader: {
    gridArea: "header",
    bg: "gray.800",
    borderBottom: "1px solid",
    borderColor: "whiteAlpha.200",
    p: 4,
    display: "flex",
    alignItems: "center",
    gap: 3,
    boxShadow: "md",
  },
  backButton: {
    variant: "ghost",
    size: "sm",
    color: "whiteAlpha.800",
    _hover: {
      bg: "whiteAlpha.200",
    },
  },
  characterHeaderInfo: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  headerActions: {
    display: { base: "flex", lg: "none" },
    gap: 2,
  },
  infoButton: {
    variant: "ghost",
    size: "sm",
    color: "whiteAlpha.800",
    _hover: {
      bg: "whiteAlpha.200",
    },
  },
  characterAvatar: {
    size: "md",
    border: "2px solid",
    borderColor: "brand.primary.500",
  },
  characterNameHeader: {
    fontSize: "lg",
    fontWeight: "semibold",
    color: "white",
    fontFamily: "heading",
  },
  characterStatus: {
    fontSize: "sm",
    color: "whiteAlpha.700",
  },
  // Panneau du personnage
  characterCard: {
    gridArea: "character",
    bg: "gray.800",
    borderRight: { base: "none", lg: "1px solid" },
    borderColor: "whiteAlpha.200",
    display: { base: "none", lg: "flex" },
    flexDirection: "column" as const,
    overflow: "hidden",
  },
  characterImageContainer: {
    position: "relative" as const,
    overflow: "hidden",
  },
  characterImage: {
    w: "100%",
    h: { base: "200px", lg: "250px" },
    objectFit: "cover" as const,
  },
  characterImageFallback: {
    w: "100%",
    h: { base: "200px", lg: "250px" },
    bg: "gray.700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  characterAvatarFallback: {
    bg: "brand.primary.500",
    color: "white",
    fontSize: "2xl",
    fontWeight: "bold",
  },
  characterOverlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    bg: "blackAlpha.700",
    p: 3,
  },
  characterName: {
    fontSize: "lg",
    fontWeight: "bold",
    color: "white",
    fontFamily: "heading",
  },
  characterInfo: {
    p: 4,
    bg: "gray.700",
    flex: 1,
    overflowY: "auto" as const,
  },
  characterInfoStack: {
    spacing: 4,
    align: "stretch" as const,
  },
  personalityLabel: {
    fontSize: "sm",
    fontWeight: "bold",
    color: "brand.primary.300",
    mb: 2,
  },
  personalityText: {
    color: "whiteAlpha.900",
    fontSize: "sm",
    lineHeight: "relaxed",
  },
  
  // Zone de chat principale
  chatContainer: {
    gridArea: "chat",
    bg: "gray.900",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
  },
  // Zone des messages
  messagesContainer: {
    flex: 1,
    overflowY: "auto" as const,
    pl: 3,
    pr: 0,
    py: 3,
    bg: "gray.900",
  },
  scrollbarStyles: {
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(255, 255, 255, 0.05)',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(255, 255, 255, 0.3)',
    },
  },
  messagesStack: {
    spacing: 0,
    align: "stretch" as const,
    w: "100%",
  },
  emptyState: {
    textAlign: "center" as const,
    py: 20,
    px: 4,
  },
  emptyStateText: {
    color: "whiteAlpha.600",
    fontSize: "lg",
    fontStyle: "italic",
  },
  // Zone de saisie
  inputContainer: {
    p: 4,
    borderTop: "1px solid",
    borderColor: "whiteAlpha.200",
    bg: "gray.800",
  },
  inputStack: {
    spacing: 3,
    align: "center",
  },
  messageInput: {
    bg: "gray.700",
    border: "1px solid",
    borderColor: "whiteAlpha.200",
    color: "white",
    borderRadius: "lg",
    px: 4,
    py: 2,
    fontSize: "md",
    _placeholder: { color: "whiteAlpha.500" },
    _focus: {
      bg: "gray.600",
      borderColor: "brand.primary.500",
      boxShadow: "0 0 0 2px rgba(33, 150, 243, 0.2)",
    },
    _hover: {
      borderColor: "whiteAlpha.300",
    },
  },
  sendButton: {
    bgGradient: "linear(to-r, brand.primary.500, brand.secondary.500)",
    color: "white",
    size: "md",
    borderRadius: "lg",
    minW: "44px",
    h: "44px",
    _hover: {
      bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
      transform: "translateY(-1px)",
    },
    _active: {
      bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
      transform: "translateY(0)",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      _hover: {
        transform: "none",
      },
    },
  },

  // Panneau des indices
  cluesPanel: {
    gridArea: "clues",
    bg: "gray.800",
    borderLeft: { base: "none", lg: "1px solid" },
    borderColor: "whiteAlpha.200",
    display: { base: "none", lg: "flex" },
    flexDirection: "column" as const,
    overflow: "hidden",
  },
  cluesPanelHeader: {
    p: 4,
    borderBottom: "1px solid",
    borderColor: "whiteAlpha.200",
    bg: "gray.700",
  },
  cluesPanelTitle: {
    fontSize: "lg",
    fontWeight: "bold",
    color: "white",
    fontFamily: "heading",
    bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
    bgClip: "text",
  },
  loadingContainer: {
    h: "100vh",
    bg: "gray.900",
  },
  loadingSpinner: {
    size: "xl",
    color: "brand.primary.500",
  },
  errorContainer: {
    h: "100vh",
    bg: "gray.900",
    px: 4,
  },
  errorText: {
    color: "red.400",
    fontSize: "lg",
    textAlign: "center",
    bg: "gray.800",
    p: 6,
    borderRadius: "lg",
    border: "1px solid",
    borderColor: "red.500",
    boxShadow: "xl",
  },
};

export const dialogueProps = {
  backButtonText: "Retour au menu du jeu",
  toggleButtonLabel: "Afficher/masquer les informations",
  sendButtonLabel: "Envoyer le message",
  inputPlaceholder: "Tapez votre message...",
  emptyStateText: (characterName: string) => `Commencez la conversation avec ${characterName}`,
  personalityLabel: "Personnalité",
  errorMessages: {
    missingParams: "Paramètres manquants pour le dialogue",
    loadError: "Impossible de charger les données du dialogue",
    characterNotFound: "Personnage non trouvé",
  },
  toastMessages: {
    clueTitle: "Indice",
  },
}; 