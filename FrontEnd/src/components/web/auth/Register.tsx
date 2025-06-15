import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../contexts/AuthContext';
import { PlayerService } from '../../../services/game/playerService';
import type { RegisterFormData } from '../../../services/userTypes';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    surname: '',
    email: '',
    password: '',
    image_url: 'https://example.com/default-avatar.jpg',
    username: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Préparer les données pour l'User (sans username)
      const userCredentials = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        image_url: formData.image_url,
      };

      // 2. Créer l'utilisateur et s'authentifier
      const user = await register(userCredentials);
      
      // 3. Créer le joueur maintenant que l'utilisateur est authentifié
      if (user?.id) {
        try {
          const playerService = PlayerService.getInstance();
          await playerService.createPlayer(
            user.id, 
            formData.username || `${formData.name} ${formData.surname}`, 
            formData.image_url
          );
        } catch (playerError) {
          console.warn('Erreur lors de la création du joueur:', playerError);
          // On continue même si la création du joueur échoue
        }
      }
      
      navigate('/stories');
    } catch (err) {
      console.error('Erreur d\'inscription:', err);
      setError('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
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
        <Container maxW="container.sm" py={8}>
          <Box
              bg="gray.800"
              borderRadius="xl"
              p={8}
              borderWidth="1px"
              borderColor="whiteAlpha.200"
              boxShadow="2xl"
              _hover={{
                borderColor: 'brand.primary.500',
                transition: 'all 0.3s ease',
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
                  Inscription
                </Heading>
                <Text color="whiteAlpha.600">Créez votre compte pour commencer l'aventure</Text>
              </VStack>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel color="whiteAlpha.900">Prénom</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="whiteAlpha.900">Nom</FormLabel>
                    <Input
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="whiteAlpha.900">Email</FormLabel>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="whiteAlpha.900">Nom du joueur</FormLabel>
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Ex : Sherlock"
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="whiteAlpha.900">URL de l'image de profil</FormLabel>
                    <Input
                        name="image_url"
                        type="url"
                        value={formData.image_url}
                        onChange={handleChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                        _hover={{ bg: 'gray.600' }}
                        _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="whiteAlpha.900">Mot de passe</FormLabel>
                    <InputGroup>
                      <Input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          bg="gray.700"
                          border="none"
                          color="white"
                          _hover={{ bg: 'gray.600' }}
                          _focus={{ bg: 'gray.600', borderColor: 'brand.primary.400' }}
                      />
                      <InputRightElement>
                        <IconButton
                            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            onClick={() => setShowPassword(!showPassword)}
                            variant="ghost"
                            color="whiteAlpha.700"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {error && (
                      <Text color="red.400" mt={2} textAlign="center">
                        {error}
                      </Text>
                  )}

                  <Button
                      type="submit"
                      w="full"
                      bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                      color="white"
                      size="lg"
                      fontSize="md"
                      isLoading={isLoading}
                      _hover={{
                        bgGradient: 'linear(to-r, brand.primary.600, brand.secondary.600)',
                        transform: 'translateY(-2px)',
                      }}
                      _active={{
                        transform: 'translateY(0)',
                      }}
                  >
                    S'inscrire
                  </Button>
                </VStack>
              </form>

              <VStack spacing={4}>
                <Divider borderColor="whiteAlpha.400" />

                <Button
                    w="full"
                    variant="outline"
                    leftIcon={<FcGoogle />}
                    color="whiteAlpha.900"
                    borderColor="whiteAlpha.400"
                    _hover={{
                      bg: 'whiteAlpha.100',
                      transform: 'translateY(-2px)',
                    }}
                >
                  Continuer avec Google
                </Button>

                <Text color="whiteAlpha.600" fontSize="sm">
                  Déjà un compte ?{' '}
                  <Button
                      as={RouterLink}
                      to="/login"
                      variant="link"
                      color="brand.primary.400"
                      _hover={{
                        color: 'brand.primary.300',
                      }}
                  >
                    Se connecter
                  </Button>
                </Text>
              </VStack>
            </VStack>
          </Box>
        </Container>
      </Box>
  );
};

export default Register;
