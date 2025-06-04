import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const Hero: React.FC = () => {
  return (
    <Box 
      as="section"
      textAlign="center"
      py={16}
    >
      <VStack spacing={4}>
        <Heading
          as="h1"
          fontSize="6xl"
          fontWeight="600"
          letterSpacing="-0.5px"
        >
          MindProd
        </Heading>
        <Text
          fontSize="xl"
          color="gray.600"
        >
          A Platform for Stories
        </Text>
      </VStack>
    </Box>
  );
};

export default Hero; 