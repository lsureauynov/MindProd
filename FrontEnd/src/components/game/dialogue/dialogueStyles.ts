export const dialogueStyles = {
  mainContainer: {
    as: "main" as const,
    minH: "100vh",
    bg: "gray.900",
    bgGradient: "linear(to-b, gray.900, gray.800)",
    py: 8,
  },
  container: (containerWidth: string | undefined) => ({
    maxW: containerWidth,
    h: "100%",
    display: "flex",
    flexDirection: "column" as const,
  }),
  mainFlex: {
    direction: "column" as const,
    h: "calc(100vh - 4rem)",
  },
  backButtonContainer: {
    mb: 6,
  },
  backButton: {
    bgGradient: "linear(to-r, brand.primary.500, brand.secondary.500)",
    color: "white",
    size: { base: "md", md: "lg" },
    px: { base: 4, md: 6 },
    _hover: {
      transform: 'translateX(-4px)',
      bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
    },
    _active: {
      bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
    },
  },
  characterCard: {
    bg: "gray.800",
    borderRadius: "xl",
    overflow: "hidden",
    boxShadow: "xl",
  },
  characterImageContainer: {
    position: "relative" as const,
  },
  characterImage: {
    w: "100%",
    h: { base: "200px", md: "250px" },
    objectFit: "cover" as const,
  },
  characterOverlay: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    bg: "blackAlpha.700",
    p: 4,
  },
  characterHeader: {
    justify: "space-between",
    align: "center" as const,
  },
  characterName: {
    fontSize: { base: "xl", md: "2xl" },
    fontWeight: "bold",
    color: "white",
    fontFamily: "heading",
  },
  toggleButton: {
    variant: "ghost",
    color: "white",
    size: "lg",
    _hover: { bg: "whiteAlpha.200" },
  },
  characterInfo: {
    p: 6,
    bg: "gray.700",
  },
  characterInfoStack: {
    spacing: 4,
    align: "stretch" as const,
  },
  personalityLabel: {
    fontSize: "sm",
    fontWeight: "semibold",
    color: "brand.primary.300",
    mb: 2,
  },
  personalityText: {
    color: "whiteAlpha.800",
    fontSize: "sm",
  },
  backstoryLabel: {
    fontSize: "sm",
    fontWeight: "semibold",
    color: "brand.secondary.300",
    mb: 2,
  },
  backstoryText: {
    color: "whiteAlpha.800",
    fontSize: "sm",
  },
  chatContainer: {
    flex: "1",
    bg: "gray.800",
    borderRadius: "xl",
    mt: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
  },
  messagesContainer: {
    flex: "1",
    overflowY: "auto" as const,
    p: 4,
  },
  messagesStack: {
    spacing: 4,
    align: "stretch" as const,
  },
  emptyState: {
    textAlign: "center" as const,
    py: 8,
  },
  emptyStateText: {
    color: "whiteAlpha.600",
    fontSize: "lg",
  },
  inputContainer: {
    p: 4,
    borderTop: "1px",
    borderColor: "whiteAlpha.200",
  },
  inputStack: {
    spacing: 3,
  },
  messageInput: {
    bg: "gray.700",
    border: "none",
    color: "white",
    _placeholder: { color: "whiteAlpha.500" },
    _focus: {
      bg: "gray.600",
      boxShadow: "0 0 0 2px var(--chakra-colors-brand-primary-500)",
    },
    fontSize: { base: "md", md: "lg" },
  },
  sendButton: {
    bgGradient: "linear(to-r, brand.primary.500, brand.secondary.500)",
    color: "white",
    size: "lg",
    _hover: {
      bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
      transform: "scale(1.05)",
    },
    _active: {
      bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
      transform: "scale(0.95)",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      _hover: {
        transform: "none",
      },
    },
  },
  loadingContainer: {
    h: "100vh",
  },
  loadingSpinner: {
    size: "xl",
    color: "brand.primary.500",
  },
  errorContainer: {
    h: "100vh",
  },
  errorText: {
    color: "red.500",
  },
};

export const dialogueProps = {
  backButtonText: "Retour au menu du jeu",
  toggleButtonLabel: "Afficher/masquer les informations",
  sendButtonLabel: "Envoyer le message",
  inputPlaceholder: "Tapez votre message...",
  emptyStateText: (characterName: string) => `Commencez la conversation avec ${characterName}`,
  personalityLabel: "Personnalité",
  backstoryLabel: "Dans cette affaire",
  errorMessages: {
    missingParams: "Paramètres manquants pour le dialogue",
    loadError: "Impossible de charger les données du dialogue",
    characterNotFound: "Personnage non trouvé",
  },
  toastMessages: {
    clueTitle: "Indice",
  },
}; 