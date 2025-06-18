export const messageBubbleStyles = {
  container: (isUser: boolean) => ({
    w: "100%",
    justify: isUser ? 'flex-end' : 'flex-start',
    align: "flex-end" as const,
    mb: 4,
    px: 0,
  }),
  avatar: {
    size: "sm",
    mr: 2,
    border: "2px solid",
    borderColor: "whiteAlpha.200",
  },
  userAvatar: {
    size: "sm",
    name: "User",
    bg: "brand.primary.500",
    color: "white",
    ml: 2,
    border: "2px solid",
    borderColor: "brand.primary.400",
  },
  bubble: (isUser: boolean) => ({
    maxW: "70%",
    bg: isUser ? 'brand.primary.500' : 'gray.700',
    color: isUser ? 'white' : 'whiteAlpha.900',
    px: 4,
    py: 3,
    borderRadius: "xl",
    borderBottomRightRadius: isUser ? "md" : 'xl',
    borderBottomLeftRadius: isUser ? 'xl' : "md",
    boxShadow: "lg",
    border: "1px solid",
    borderColor: isUser ? "brand.primary.400" : "whiteAlpha.200",
    position: "relative",
  }),
  messageText: {
    fontSize: "md",
    lineHeight: "relaxed",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  },
  timestamp: (isUser: boolean) => ({
    fontSize: "xs",
    color: isUser ? 'whiteAlpha.700' : 'whiteAlpha.600',
    textAlign: isUser ? 'right' : 'left',
    mt: 1,
    opacity: 0.8,
  }),
};

export const messageBubbleProps = {
  characterAvatarName: "Character",
  userAvatarName: "User",
  timeFormat: {
    hour: '2-digit' as const,
    minute: '2-digit' as const,
  },
}; 