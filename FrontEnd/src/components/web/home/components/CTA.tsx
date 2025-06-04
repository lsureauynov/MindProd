import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';

const CTA: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      as="section"
      bg={bgColor}
      py={20}
    >
      <Container maxW="container.md">
        <VStack spacing={8} textAlign="center">
          <Heading
            as="h2"
            size="2xl"
            fontWeight="bold"
          >
            Start Your Journey Today
          </Heading>
          
          <Text
            fontSize="xl"
            color={textColor}
            maxW="2xl"
          >
            Join our community of storytellers and readers. Share your experiences, discover new perspectives, and connect with others through the power of stories.
          </Text>

          <Button
            as={RouterLink}
            to="/register"
            size="lg"
            colorScheme="blue"
            px={8}
            fontSize="md"
            fontWeight="bold"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
          >
            Get Started
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default CTA; 