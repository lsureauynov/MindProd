// Contact.tsx
import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';
import { ContactForm } from './components/ContactForm';
import { ContactHeader } from './components/ContactHeader';
import { useContactForm } from './hooks/useContactForm';

const ContactPage: React.FC = () => {
  const { formData, errors, isLoading, handleSubmit, handleChange } = useContactForm();

  return (
      <Box as="main" minH="100vh" pt="80px" bg="gray.900" bgGradient="linear(to-b, gray.900, gray.800)">
        <Container maxW="container.md" py={8}>
          <VStack spacing={8} align="stretch">
            <ContactHeader />
            <ContactForm
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
          </VStack>
        </Container>
      </Box>
  );
};

export default ContactPage;
