export const messageBubbleStyles = {
  container: (isUser: boolean, maxWidth: string | undefined) => ({
    w: "100%",
    justify: isUser ? 'flex-end' : 'flex-start',
    align: "flex-start" as const,
    mb: 4,
  }),
  avatar: (avatarSize: string | undefined, spacing: number | undefined) => ({
    size: avatarSize,
    mr: spacing,
  }),
  userAvatar: (avatarSize: string | undefined, spacing: number | undefined) => ({
    size: avatarSize,
    name: "User",
    bg: "blue.500",
    ml: spacing,
  }),
  bubble: (isUser: boolean, maxWidth: string | undefined) => ({
    maxW: maxWidth,
    bg: isUser ? 'blue.500' : 'gray.100',
    color: isUser ? 'white' : 'black',
    px: 4,
    py: 3,
    borderRadius: "2xl",
    borderBottomRightRadius: isUser ? 0 : '2xl',
    borderBottomLeftRadius: isUser ? '2xl' : 0,
    boxShadow: "sm",
  }),
  messageText: (fontSize: string | undefined) => ({
    fontSize: fontSize,
    lineHeight: "tall",
    whiteSpace: "pre-wrap" as const,
    wordBreak: "break-word" as const,
  }),
  timestamp: (isUser: boolean, timeSize: string | undefined) => ({
    fontSize: timeSize,
    color: isUser ? 'whiteAlpha.800' : 'gray.500',
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