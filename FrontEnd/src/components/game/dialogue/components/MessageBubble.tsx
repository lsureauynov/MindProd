import {
  Box,
  Text,
  Avatar,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import type { Message } from '../dialogueTypes';
import { messageBubbleStyles, messageBubbleProps } from './messageBubbleStyles';

interface MessageBubbleProps {
  message: Message;
  characterImage: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, characterImage }) => {
  const isUser = message.sender === 'user';
  const maxWidth = useBreakpointValue({ base: "75%", sm: "70%", md: "60%", lg: "50%" });
  const avatarSize = useBreakpointValue({ base: "sm", md: "md" });
  const fontSize = useBreakpointValue({ base: "md", md: "lg" });
  const timeSize = useBreakpointValue({ base: "xs", md: "sm" });
  const spacing = useBreakpointValue({ base: 2, md: 3 });

  return (
    <Flex sx={messageBubbleStyles.container(isUser, maxWidth)}>
      {!isUser && (
        <Avatar
          sx={messageBubbleStyles.avatar(avatarSize, spacing)}
          src={characterImage}
          name={messageBubbleProps.characterAvatarName}
        />
      )}
      <Box sx={messageBubbleStyles.bubble(isUser, maxWidth)}>
        <Text sx={messageBubbleStyles.messageText(fontSize)}>
          {message.content}
        </Text>
        <Text sx={messageBubbleStyles.timestamp(isUser, timeSize)}>
          {new Date(message.timestamp).toLocaleTimeString([], messageBubbleProps.timeFormat)}
        </Text>
      </Box>
      {isUser && (
        <Avatar sx={messageBubbleStyles.userAvatar(avatarSize, spacing)} />
      )}
    </Flex>
  );
}; 