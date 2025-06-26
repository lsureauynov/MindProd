import {
  Box,
  Text,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import type { Message } from '../dialogueTypes';
import { messageBubbleStyles, messageBubbleProps } from './messageBubbleStyles';

interface MessageBubbleProps {
  message: Message;
  characterImage: string;
  characterName?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, characterImage, characterName }) => {
  const isUser = message.sender === 'user';

  return (
    <Flex sx={messageBubbleStyles.container(isUser)}>
      {isUser && (
        <Avatar sx={messageBubbleStyles.userAvatar} />
      )}
      <Box sx={messageBubbleStyles.bubble(isUser)}>
        <Text sx={messageBubbleStyles.messageText}>
          {message.content}
        </Text>
        <Text sx={messageBubbleStyles.timestamp(isUser)}>
          {new Date(message.timestamp).toLocaleTimeString([], messageBubbleProps.timeFormat)}
        </Text>
      </Box>
      {!isUser && (
        <Avatar
          sx={messageBubbleStyles.avatar}
          src={characterImage || undefined}
          name={characterName || messageBubbleProps.characterAvatarName}
        />
      )}
    </Flex>
  );
}; 