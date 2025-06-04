import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  useDisclosure,
  useToast,
  Divider,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  InputGroup,
  InputRightElement,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, EditIcon } from '@chakra-ui/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Types
interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  bio: string;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  newEmail: string;
}

const ProfileHeader: React.FC<{ userProfile: UserProfile }> = ({ userProfile }) => (
  <Box textAlign="center">
    <Avatar
      size="2xl"
      name={userProfile.name}
      src={userProfile.avatar}
      mb={4}
    />
    <Heading size="lg" mb={2}>
      Mon Compte
    </Heading>
  </Box>
);

// Composant pour le formulaire du profil
const ProfileForm: React.FC<{
  userProfile: UserProfile;
  editedProfile: UserProfile;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ userProfile, editedProfile, isEditing, onChange }) => (
  <SimpleGrid columns={1} spacing={6}>
    <FormControl>
      <FormLabel>Nom</FormLabel>
      <Input
        name="name"
        value={isEditing ? editedProfile.name : userProfile.name}
        onChange={onChange}
        readOnly={!isEditing}
      />
    </FormControl>

    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input
        name="email"
        type="email"
        value={isEditing ? editedProfile.email : userProfile.email}
        onChange={onChange}
        readOnly={!isEditing}
      />
    </FormControl>

    <FormControl>
      <FormLabel>Bio</FormLabel>
      <Input
        name="bio"
        value={isEditing ? editedProfile.bio : userProfile.bio}
        onChange={onChange}
        readOnly={!isEditing}
      />
    </FormControl>
  </SimpleGrid>
);

// Composant pour les paramètres de sécurité
const SecuritySettingsForm: React.FC<{
  securitySettings: SecuritySettings;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (type: 'email' | 'password') => void;
}> = ({ securitySettings, onChange, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={4}>
          Changer le mot de passe
        </Heading>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Mot de passe actuel</FormLabel>
            <InputGroup>
              <Input
                name="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={securitySettings.currentPassword}
                onChange={onChange}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Nouveau mot de passe</FormLabel>
            <InputGroup>
              <Input
                name="newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={securitySettings.newPassword}
                onChange={onChange}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showNewPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Confirmer le nouveau mot de passe</FormLabel>
            <InputGroup>
              <Input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={securitySettings.confirmPassword}
                onChange={onChange}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  variant="ghost"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button colorScheme="blue" onClick={() => onSubmit('password')} alignSelf="flex-start">
            Mettre à jour le mot de passe
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

// Composant principal Account
const Account: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    currentPassword: "",
    newPassword: "",
  });

  const stats = {
    storiesPlayed: 12,
    storiesCompleted: 8,
    accuracy: 75,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    // Simuler la sauvegarde
    setTimeout(() => {
      setIsLoading(false);
      setIsEditing(false);
      toast({
        title: "Modifications enregistrées",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    // Simuler la suppression
    setTimeout(() => {
      setIsLoading(false);
      setIsDeleteDialogOpen(false);
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    }, 1000);
  };

  return (
    <Box 
      as="main" 
      minH="100vh" 
      bg="gray.900"
      bgGradient="linear(to-b, gray.900, gray.800)"
      pt="80px"
    >
      <Container maxW="container.lg" py={8}>
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
              Mon Compte
            </Heading>
          </Box>

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
            <VStack spacing={6} align="center">
              <Box position="relative">
                <Avatar
                  size="2xl"
                  name={userData.name}
                  src={userData.avatar}
                  border="4px solid"
                  borderColor="brand.primary.500"
                />
                {isEditing && (
                  <Button
                    size="sm"
                    position="absolute"
                    bottom="0"
                    right="0"
                    colorScheme="blue"
                    rounded="full"
                    leftIcon={<EditIcon />}
                  >
                    Modifier
                  </Button>
                )}
              </Box>

              {isEditing ? (
                <VStack spacing={4} w="full" maxW="md">
                  <FormControl>
                    <FormLabel color="whiteAlpha.900">Nom</FormLabel>
                    <Input
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="none"
                      color="white"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel color="whiteAlpha.900">Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      bg="gray.700"
                      border="none"
                      color="white"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color="whiteAlpha.900">Mot de passe actuel</FormLabel>
                    <InputGroup>
                      <Input
                        name="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={userData.currentPassword}
                        onChange={handleInputChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showPassword ? 'Masquer' : 'Afficher'}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                          color="whiteAlpha.700"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel color="whiteAlpha.900">Nouveau mot de passe</FormLabel>
                    <InputGroup>
                      <Input
                        name="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={userData.newPassword}
                        onChange={handleInputChange}
                        bg="gray.700"
                        border="none"
                        color="white"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={showNewPassword ? 'Masquer' : 'Afficher'}
                          icon={showNewPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          variant="ghost"
                          color="whiteAlpha.700"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <Button
                    bgGradient="linear(to-r, brand.primary.500, brand.secondary.500)"
                    color="white"
                    onClick={handleSaveChanges}
                    isLoading={isLoading}
                    w="full"
                  >
                    Enregistrer les modifications
                  </Button>
                  
                  <Button
                    variant="ghost"
                    color="whiteAlpha.700"
                    onClick={() => setIsEditing(false)}
                    w="full"
                  >
                    Annuler
                  </Button>
                </VStack>
              ) : (
                <VStack spacing={2}>
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="whiteAlpha.900"
                    fontFamily="heading"
                  >
                    {userData.name}
                  </Text>
                  <Text
                    fontSize="md"
                    color="whiteAlpha.600"
                  >
                    {userData.email}
                  </Text>
                  <Button
                    leftIcon={<EditIcon />}
                    variant="ghost"
                    color="brand.primary.400"
                    onClick={() => setIsEditing(true)}
                    mt={2}
                  >
                    Modifier le profil
                  </Button>
                </VStack>
              )}
            </VStack>

            <Divider my={8} borderColor="whiteAlpha.300" />

            <StatGroup 
              textAlign="center"
              bg="gray.700"
              p={6}
              borderRadius="lg"
              spacing={8}
            >
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="full">
                <Stat>
                  <StatLabel 
                    color="whiteAlpha.600"
                    fontSize="lg"
                    fontFamily="heading"
                  >
                    Histoires jouées
                  </StatLabel>
                  <StatNumber 
                    color="brand.primary.400"
                    fontSize="3xl"
                    fontWeight="bold"
                  >
                    {stats.storiesPlayed}
                  </StatNumber>
                </Stat>

                <Stat>
                  <StatLabel 
                    color="whiteAlpha.600"
                    fontSize="lg"
                    fontFamily="heading"
                  >
                    Histoires complétées
                  </StatLabel>
                  <StatNumber 
                    color="brand.secondary.400"
                    fontSize="3xl"
                    fontWeight="bold"
                  >
                    {stats.storiesCompleted}
                  </StatNumber>
                </Stat>

                <Stat>
                  <StatLabel 
                    color="whiteAlpha.600"
                    fontSize="lg"
                    fontFamily="heading"
                  >
                    Taux de réussite
                  </StatLabel>
                  <StatNumber 
                    color="brand.accent.400"
                    fontSize="3xl"
                    fontWeight="bold"
                  >
                    {stats.accuracy}%
                  </StatNumber>
                </Stat>
              </SimpleGrid>
            </StatGroup>

            <VStack mt={8} spacing={4}>
              <Button
                bgGradient="linear(to-r, red.600, red.400)"
                color="white"
                size="lg"
                onClick={() => setIsDeleteDialogOpen(true)}
                _hover={{
                  bgGradient: "linear(to-r, red.500, red.300)",
                  transform: "translateY(-2px)",
                }}
                _active={{
                  bgGradient: "linear(to-r, red.700, red.500)",
                  transform: "translateY(0)",
                }}
              >
                Supprimer le compte
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="gray.800" borderColor="whiteAlpha.200">
            <AlertDialogHeader color="white" fontSize="lg" fontWeight="bold">
              Supprimer le compte
            </AlertDialogHeader>

            <AlertDialogBody color="whiteAlpha.900">
              Êtes-vous sûr ? Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => setIsDeleteDialogOpen(false)}
                variant="ghost"
                color="whiteAlpha.700"
              >
                Annuler
              </Button>
              <Button
                bgGradient="linear(to-r, red.600, red.400)"
                color="white"
                onClick={handleDeleteAccount}
                ml={3}
                _hover={{
                  bgGradient: "linear(to-r, red.500, red.300)",
                }}
              >
                Supprimer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Account; 