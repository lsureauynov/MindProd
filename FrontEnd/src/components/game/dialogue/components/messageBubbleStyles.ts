export const messageBubbleStyles = {
  container: (isUser: boolean) => ({
    w: "100%",
    justify: isUser ? 'flex-start' : 'flex-end',
    align: "flex-end" as const,
    mb: 3,
    px: 0,
  }),
  avatar: {
    size: "sm",
    ml: 1,
    border: "2px solid",
    borderColor: "whiteAlpha.200",
  },
  userAvatar: {
    size: "sm",
    name: "User",
    bg: "brand.primary.500",
    color: "white",
    mr: 2,
    border: "2px solid",
    borderColor: "brand.primary.400",
  },
  bubble: (isUser: boolean) => ({
    maxW: "85%",
    minW: isUser ? "auto" : "200px",
    ml: isUser ? 0 : "auto",
    bg: isUser ? 'brand.primary.500' : 'gray.700',
    color: isUser ? 'white' : 'whiteAlpha.900',
    px: 4,
    py: 3,
    borderRadius: "xl",
    borderBottomRightRadius: isUser ? 'xl' : "md",
    borderBottomLeftRadius: isUser ? "md" : 'xl',
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
    textAlign: isUser ? 'left' : 'right',
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