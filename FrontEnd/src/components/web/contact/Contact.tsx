import { Box, Container, VStack } from '@chakra-ui/react';
import { ContactForm } from './components/ContactForm';
import { ContactHeader } from './components/ContactHeader';
import { useContactForm } from './hooks/useContactForm';
import { contactStyles, contactProps } from './contactStyles';

const ContactPage: React.FC = () => {
  const { formData, errors, isLoading, handleSubmit, handleChange } = useContactForm();

  return (
      <Box as="main" sx={contactStyles.main}>
        <Container sx={contactStyles.container}>
          <VStack spacing={contactProps.container.spacing} align={contactProps.container.align}>
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
