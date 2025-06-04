import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Container,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box
      as="header"
      position="fixed"
      w="100%"
      zIndex={1000}
      bg="rgba(26, 32, 44, 0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px"
      borderColor="whiteAlpha.200"
      top={0}
    >
      <Container maxW="container.xl">
        <Flex h={20} alignItems="center" justifyContent="space-between">
          <HStack spacing={8} alignItems="center">
            <Link 
              as={RouterLink} 
              to="/" 
              fontSize="2xl" 
              fontWeight="bold"
              fontFamily="heading"
              bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
              bgClip="text"
              _hover={{
                textDecoration: 'none',
                bgGradient: "linear(to-r, brand.primary.400, brand.secondary.400)"
              }}
            >
              MindProd
            </Link>
            <HStack as="nav" spacing={4}>
              <Link 
                as={RouterLink} 
                to="/stories"
                color="whiteAlpha.900"
                _hover={{
                  color: "brand.primary.400",
                  textDecoration: "none"
                }}
              >
                Histoires
              </Link>
              <Link 
                as={RouterLink} 
                to="/contact"
                color="whiteAlpha.900"
                _hover={{
                  color: "brand.primary.400",
                  textDecoration: "none"
                }}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link 
                  as={RouterLink} 
                  to="/account"
                  color="whiteAlpha.900"
                  _hover={{
                    color: "brand.primary.400",
                    textDecoration: "none"
                  }}
                >
                  Compte
                </Link>
              )}
            </HStack>
          </HStack>

          <HStack>
            {!isAuthenticated ? (
              <>
                <Button 
                  as={RouterLink} 
                  to="/login" 
                  variant="ghost"
                  color="whiteAlpha.900"
                  _hover={{
                    bg: "whiteAlpha.200"
                  }}
                >
                  Connexion
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                  color="white"
                  _hover={{
                    bgGradient: "linear(to-r, brand.primary.600, brand.secondary.600)",
                    transform: "translateY(-2px)"
                  }}
                >
                  Inscription
                </Button>
              </>
            ) : (
              <Button
                onClick={logout}
                variant="ghost"
                color="red.400"
                _hover={{
                  bg: "whiteAlpha.200"
                }}
              >
                Déconnexion
              </Button>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header; 