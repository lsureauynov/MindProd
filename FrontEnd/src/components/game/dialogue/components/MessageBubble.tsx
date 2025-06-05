import React from 'react';
import {
  Box,
  Text,
  Avatar,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import type { Message } from '../dialogueTypes.ts';

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
    <Flex
      w="100%"
      justify={isUser ? 'flex-end' : 'flex-start'}
      align="flex-start"
      mb={4}
    >
      {!isUser && (
        <Avatar
          size={avatarSize}
          src={characterImage}
          name="Character"
          mr={spacing}
        />
      )}
      <Box
        maxW={maxWidth}
        bg={isUser ? 'blue.500' : 'gray.100'}
        color={isUser ? 'white' : 'black'}
        px={4}
        py={3}
        borderRadius="2xl"
        borderBottomRightRadius={isUser ? 0 : '2xl'}
        borderBottomLeftRadius={isUser ? '2xl' : 0}
        boxShadow="sm"
      >
        <Text 
          fontSize={fontSize}
          lineHeight="tall"
          whiteSpace="pre-wrap"
          wordBreak="break-word"
        >
          {message.content}
        </Text>
        <Text
          fontSize={timeSize}
          color={isUser ? 'whiteAlpha.800' : 'gray.500'}
          textAlign={isUser ? 'right' : 'left'}
          mt={1}
          opacity={0.8}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </Box>
      {isUser && (
        <Avatar
          size={avatarSize}
          name="User"
          bg="blue.500"
          ml={spacing}
        />
      )}
    </Flex>
  );
}; 