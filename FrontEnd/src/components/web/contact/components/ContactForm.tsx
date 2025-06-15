import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
  Select,
  Heading,
  Text,
} from '@chakra-ui/react';
import type { ContactForm as IContactForm, ContactFormErrors } from '../types';
import { SUBJECT_OPTIONS } from '../types';
import { contactFormStyles, contactFormProps } from './contactFormStyles';

interface ContactFormProps {
  formData: IContactForm;
  errors: ContactFormErrors;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  errors,
  isLoading,
  onSubmit,
  onChange,
}) => {
  return (
    <Box sx={contactFormStyles.formContainer}>
      <VStack spacing={contactFormProps.container.spacing} align={contactFormProps.container.align}>
        <VStack spacing={contactFormProps.header.spacing} align={contactFormProps.header.align}>
          <Heading
            as="h1"
            size={contactFormProps.title.size}
            sx={contactFormStyles.title}
          >
            Contact
          </Heading>
          <Text sx={contactFormStyles.subtitle}>
            Une question ? Un retour ? Écrivez-nous.
          </Text>
        </VStack>

        <form onSubmit={onSubmit}>
          <VStack spacing={contactFormProps.form.spacing}>
            <FormControl isRequired isInvalid={!!errors.name}>
              <FormLabel sx={contactFormStyles.formLabel}>Nom</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="Votre nom"
                sx={contactFormStyles.input}
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.email}>
              <FormLabel sx={contactFormStyles.formLabel}>Email</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={onChange}
                placeholder="votre@email.com"
                sx={contactFormStyles.input}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.subject}>
              <FormLabel sx={contactFormStyles.formLabel}>Sujet</FormLabel>
              <Select
                name="subject"
                value={formData.subject}
                onChange={onChange}
                placeholder="Sélectionnez un sujet"
                sx={contactFormStyles.select}
              >
                {SUBJECT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.subject}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={!!errors.message}>
              <FormLabel sx={contactFormStyles.formLabel}>Message</FormLabel>
              <Textarea
                name="message"
                value={formData.message}
                onChange={onChange}
                placeholder="Votre message"
                sx={contactFormStyles.textarea}
              />
              <FormErrorMessage>{errors.message}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              size={contactFormProps.submitButton.size}
              sx={contactFormStyles.submitButton}
              isLoading={isLoading}
              loadingText="Envoi en cours..."
            >
              Envoyer
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};
