import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from '@chakra-ui/react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      as="main" 
      minH="100vh" 
      bg="gray.900"
      bgGradient="linear(to-b, gray.900, gray.800)"
      pt="80px"
    >
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading 
              as="h1" 
              size="2xl" 
              mb={4}
              bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
              bgClip="text"
              fontFamily="heading"
            >
              Contactez-nous
            </Heading>
            <Text 
              fontSize="xl" 
              color="whiteAlpha.800"
              fontFamily="body"
            >
              Une question ? N'hésitez pas à nous écrire !
            </Text>
          </Box>

          <Box
            as="form"
            onSubmit={handleSubmit}
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
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel 
                  color="whiteAlpha.900"
                  fontFamily="heading"
                >
                  Nom
                </FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  bg="gray.700"
                  border="none"
                  color="white"
                  _hover={{
                    bg: "gray.600",
                  }}
                  _focus={{
                    bg: "gray.600",
                    borderColor: "brand.primary.400",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel 
                  color="whiteAlpha.900"
                  fontFamily="heading"
                >
                  Email
                </FormLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="gray.700"
                  border="none"
                  color="white"
                  _hover={{
                    bg: "gray.600",
                  }}
                  _focus={{
                    bg: "gray.600",
                    borderColor: "brand.primary.400",
                  }}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel 
                  color="whiteAlpha.900"
                  fontFamily="heading"
                >
                  Message
                </FormLabel>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  bg="gray.700"
                  border="none"
                  color="white"
                  minH="200px"
                  _hover={{
                    bg: "gray.600",
                  }}
                  _focus={{
                    bg: "gray.600",
                    borderColor: "brand.primary.400",
                  }}
                />
              </FormControl>

              <Button
                type="submit"
                bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                color="white"
                size="lg"
                width="full"
                isLoading={isSubmitting}
                _hover={{
                  bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                  transform: "translateY(-2px)",
                }}
                _active={{
                  bgGradient: "linear(to-r, brand.primary.700, brand.secondary.700)",
                  transform: "translateY(0)",
                }}
              >
                Envoyer
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 