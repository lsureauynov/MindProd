import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const from = location.state?.from?.pathname || '/stories';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
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
                Connexion
              </Heading>
              <Text color="whiteAlpha.600">
                Bienvenue ! Connectez-vous pour continuer
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
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
                      _hover={{
                        bg: "gray.600",
                      }}
                      _focus={{
                        bg: "gray.600",
                        borderColor: "brand.primary.400",
                      }}
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

                <Button
                  type="submit"
                  w="full"
                  bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                  color="white"
                  size="lg"
                  fontSize="md"
                  isLoading={isLoading}
                  _hover={{
                    bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                    transform: "translateY(-2px)",
                  }}
                  _active={{
                    transform: "translateY(0)",
                  }}
                >
                  Se connecter
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
                  bg: "whiteAlpha.100",
                  transform: "translateY(-2px)",
                }}
              >
                Continuer avec Google
              </Button>

              <Text color="whiteAlpha.600" fontSize="sm">
                Pas encore de compte ?{' '}
                <Button
                  as={RouterLink}
                  to="/register"
                  variant="link"
                  color="brand.primary.400"
                  _hover={{
                    color: "brand.primary.300",
                  }}
                >
                  S'inscrire
                </Button>
              </Text>
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default Login; 