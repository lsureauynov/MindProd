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
  Container
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
          as="main"
          minH="100vh"
          bg="gray.900"
          bgGradient="linear(to-b, gray.900, gray.800)"
          pt="80px"
      >
        <Container maxW="container.sm" py={8}>
          <Box
              bg="gray.800"
              borderRadius="xl"
              p={8}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              boxShadow="2xl"
              _hover={{
                borderColor: "brand.primary.500",
                transition: "all 0.3s ease",
              }}
          >
            <VStack spacing={8} align="stretch">
              <VStack spacing={2} align="center">
                <Heading
                    as="h1"
                    size="xl"
                    bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
                    bgClip="text"
                    fontFamily="heading"
                >
                  Contact
                </Heading>
                <Text color="whiteAlpha.600">
                  Une question ? Un retour ? Écrivez-nous.
                </Text>
              </VStack>

              <form onSubmit={onSubmit}>
                <VStack spacing={6}>

                  <FormControl isRequired isInvalid={!!errors.name}>
                    <FormLabel color="whiteAlpha.900">Nom</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={onChange}
                        placeholder="Votre nom"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: "gray.600" }}
                        _focus={{ bg: "gray.600", borderColor: "brand.primary.400" }}
                    />
                    <FormErrorMessage>{errors.name}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.email}>
                    <FormLabel color="whiteAlpha.900">Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={onChange}
                        placeholder="votre@email.com"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: "gray.600" }}
                        _focus={{ bg: "gray.600", borderColor: "brand.primary.400" }}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={!!errors.subject}>
                    <FormLabel color="whiteAlpha.900">Sujet</FormLabel>
                    <Select
                        name="subject"
                        value={formData.subject}
                        onChange={onChange}
                        placeholder="Sélectionnez un sujet"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: "gray.600" }}
                        _focus={{ bg: "gray.600", borderColor: "brand.primary.400" }}
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
                    <FormLabel color="whiteAlpha.900">Message</FormLabel>
                    <Textarea
                        name="message"
                        value={formData.message}
                        onChange={onChange}
                        placeholder="Votre message"
                        minH="200px"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: "gray.600" }}
                        _focus={{ bg: "gray.600", borderColor: "brand.primary.400" }}
                    />
                    <FormErrorMessage>{errors.message}</FormErrorMessage>
                  </FormControl>

                  <Button
                      type="submit"
                      w="full"
                      bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                      color="white"
                      size="lg"
                      fontSize="md"
                      isLoading={isLoading}
                      loadingText="Envoi en cours..."
                      _hover={{
                        bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                        transform: "translateY(-2px)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                  >
                    Envoyer
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </Container>
      </Box>
  );
};
