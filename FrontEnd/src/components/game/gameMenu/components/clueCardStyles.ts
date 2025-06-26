export const clueCardStyles = {
  container: {
    borderWidth: "1px",
    borderRadius: "xl",
    overflow: "hidden",
    p: 0,
    bg: "gray.800",
    borderColor: "whiteAlpha.200",
    position: "relative" as const,
    transition: "all 0.3s",
    _hover: {
      transform: 'translateY(-4px)',
      shadow: '2xl',
      borderColor: 'brand.accent.500',
    },
  },
  image: {
    objectFit: "cover" as const,
    w: "full",
    h: "150px",
  },
  contentStack: {
    spacing: 3,
    align: "stretch" as const,
    p: 4,
    position: "relative" as const,
    zIndex: 2,
  },
  title: {
    fontSize: "xs",
    isTruncated: true,
    color: "whiteAlpha.900",
    fontFamily: "heading",
    bgGradient: "linear(to-r, brand.accent.400, brand.primary.400)",
    bgClip: "text",
  },
  unlockButton: {
    variant: "outline",
    size: "sm",
    borderColor: "brand.accent.500",
    color: "brand.accent.400",
    _hover: {
      bg: "whiteAlpha.100",
      borderColor: "brand.accent.400",
      transform: "translateY(-2px)"
    },
  },
  description: {
    fontSize: "xs",
    color: "whiteAlpha.800",
    fontFamily: "body",
    lineHeight: "1.4",
    textAlign: "left" as const,
  },
  unlockedIcon: {
    color: "brand.accent.400",
  },
};

export const clueCardProps = {
  unlockButtonText: "Débloquer l'indice",
}; 