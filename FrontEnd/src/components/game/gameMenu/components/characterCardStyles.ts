export const characterCardStyles = {
  container: {
    borderWidth: "1px",
    borderRadius: "xl",
    overflow: "hidden",
    bg: "gray.800",
    borderColor: "whiteAlpha.200",
    position: "relative" as const,
    transition: "all 0.3s",
    cursor: "pointer",
    _hover: {
      transform: 'translateY(-4px)',
      shadow: '2xl',
      borderColor: 'brand.primary.400',
    },
  },
  image: {
    height: "200px",
    width: "100%",
    objectFit: "cover" as const,
    transition: "transform 0.3s",
    _groupHover: {
      transform: 'scale(1.05)',
    },
  },
  contentStack: {
    p: 4,
    spacing: 3,
    align: "stretch" as const,
    bg: "rgba(26, 32, 44, 0.8)",
    position: "relative" as const,
    zIndex: 2,
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontWeight: "bold",
    fontSize: "lg",
    color: "whiteAlpha.900",
    fontFamily: "heading",
  },
  chevronIcon: {
    color: "whiteAlpha.600",
    w: 6,
    h: 6,
    transition: "transform 0.2s",
  },
  expandedStack: {
    spacing: 3,
    pt: 2,
    pb: 3,
  },
  personalityLabel: {
    fontSize: "sm",
    color: "brand.primary.300",
    fontWeight: "semibold",
    mb: 1,
  },
  personalityText: {
    fontSize: "sm",
    color: "whiteAlpha.800",
  },
  backstoryLabel: {
    fontSize: "sm",
    color: "brand.secondary.300",
    fontWeight: "semibold",
    mb: 1,
  },
  backstoryText: {
    fontSize: "sm",
    color: "whiteAlpha.800",
  },
  talkButton: {
    bgGradient: "linear(to-r, brand.primary.500, brand.secondary.500)",
    color: "white",
    position: "relative" as const,
    zIndex: 3,
    cursor: "pointer",
    py: 3,
    transition: "all 0.2s",
    _hover: {
      bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
      transform: "translateY(-2px)",
      boxShadow: "xl"
    },
    _active: {
      transform: "translateY(0)",
      bgGradient: "linear(to-r, brand.primary.700, brand.secondary.700)",
    },
  },
};

export const characterCardProps = {
  labels: {
    personality: "Personnalité",
    backstory: "Dans cette affaire",
  },
  buttonText: (name: string) => `Parler avec ${name}`,
}; 