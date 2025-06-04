import React from 'react';
import {
  Heading,
  Button,
  Icon,
  Flex,
  Box,
  HStack,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { CheckCircleIcon } from '@chakra-ui/icons';

interface StoryHeaderProps {
  title: string;
  isAuthenticated: boolean;
  onPlay: () => void;
  isCompleted?: boolean;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({ 
  title, 
  isAuthenticated, 
  onPlay,
  isCompleted 
}) => {
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const iconSize = useBreakpointValue({ base: 6, md: 8 });
  const buttonPadding = useBreakpointValue({ base: 6, md: 8 });
  const buttonFontSize = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box 
      w="full" 
      py={{ base: 8, md: 16 }}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        borderRadius: 'xl',
        zIndex: 0,
      }}
    >
      <Flex 
        direction="column" 
        align="center" 
        gap={{ base: 4, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <HStack spacing={3} align="center" px={4}>
          <Heading 
            as="h1" 
            size={headingSize}
            textAlign="center"
            fontWeight="bold"
            maxW="800px"
            mx="auto"
            bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
            bgClip="text"
            fontFamily="heading"
          >
            {title}
          </Heading>
          {isCompleted && (
            <Tooltip 
              label="Histoire terminée" 
              placement="top"
              bg="gray.800"
              color="white"
            >
              <Box color="brand.accent.400">
                <Icon as={CheckCircleIcon} w={iconSize} h={iconSize} />
              </Box>
            </Tooltip>
          )}
        </HStack>
        
        {isAuthenticated && (
          <Button
            leftIcon={<Icon as={FaPlay} />}
            bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
            color="white"
            size="lg"
            onClick={onPlay}
            px={buttonPadding}
            py={6}
            fontSize={buttonFontSize}
            w={{ base: "90%", sm: "auto" }}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: '2xl',
              bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)",
            }}
            _active={{
              bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
            }}
          >
            Démarrer l'histoire
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default StoryHeader; 