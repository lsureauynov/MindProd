import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

export const ContactHeader: React.FC = () => {
  return (
    <Box textAlign="center">
      <Heading as="h1" size="xl" mb={2}>
        Contactez-nous
      </Heading>
      <Text color="gray.600">
        Une question ? Une suggestion ? N'hésitez pas à nous écrire !
      </Text>
    </Box>
  );
}; 