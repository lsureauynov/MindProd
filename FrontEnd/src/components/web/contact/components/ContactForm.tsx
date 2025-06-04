import React from 'react';
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
} from '@chakra-ui/react';
import type { ContactForm as IContactForm, ContactFormErrors } from '../types';
import { SUBJECT_OPTIONS } from '../types';

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
    <Box
      as="form"
      onSubmit={onSubmit}
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
    >
      <VStack spacing={6}>
        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>Nom</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Votre nom"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="votre@email.com"
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.subject}>
          <FormLabel>Sujet</FormLabel>
          <Select
            name="subject"
            value={formData.subject}
            onChange={onChange}
            placeholder="Sélectionnez un sujet"
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
          <FormLabel>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            placeholder="Votre message"
            minH="200px"
          />
          <FormErrorMessage>{errors.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          size="lg"
          width="full"
          isLoading={isLoading}
          loadingText="Envoi en cours..."
        >
          Envoyer
        </Button>
      </VStack>
    </Box>
  );
}; 