import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import AccountHeader from './components/AccountHeader';
import AccountStats from './components/AccountStats';
import AccountForm from './components/AccountForm';
import DeleteAccountDialog from './components/DeleteAccountDialog';
import UserService from '../../../services/userService';
import type { UserProfile, UserStats } from '../../../services/userTypes.ts';
import type { UserData } from './accountTypes.ts';

const AccountPage = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        currentPassword: '',
        newPassword: '',
    });
    const [stats, setStats] = useState<UserStats | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { logout } = useAuth();

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            UserService.getCurrentUser(),
            UserService.getUserStats(),
        ])
            .then(([user, stats]) => {
                setUserProfile(user);
                setUserData((prev) => ({
                    ...prev,
                    name: user.name,
                    email: user.email,
                }));
                setStats(stats);
            })
            .catch(() => {
                toast({
                    title: 'Erreur lors du chargement des données.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            // Mise à jour du profil
            await UserService.updateProfile({
                name: userData.name,
                email: userData.email,
                image_url: userProfile?.image_url ?? '',
            });

            // Mise à jour du mot de passe (si rempli)
            if (userData.currentPassword && userData.newPassword) {
                await UserService.updatePassword(
                    userData.currentPassword,
                    userData.newPassword
                );
            }

            toast({
                title: 'Modifications enregistrées',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setIsEditing(false);
        } catch {
            toast({
                title: 'Erreur lors de la sauvegarde',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await UserService.deleteAccount();
            toast({
                title: 'Compte supprimé',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            logout();
            navigate('/');
        } catch {
            toast({
                title: 'Erreur lors de la suppression',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
            setIsDeleteDialogOpen(false);
        }
    };

    if (!userProfile) return null;

    return (
        <Box
            as="main"
            minH="100vh"
            pt="80px"
            bgGradient="linear(to-b, gray.900, gray.800)"
        >
            <Container maxW="container.lg" py={8}>
                <VStack spacing={8}>
                    <Heading
                        bgGradient="linear(to-r, brand.primary.400, brand.secondary.400)"
                        bgClip="text"
                        fontSize="4xl"
                    >
                        Mon Compte
                    </Heading>

                    <AccountHeader
                        userProfil={userProfile}
                        isEditing={isEditing}
                        onEditAvatar={() => {}}
                    />

                    <AccountForm
                        userData={userData}
                        isEditing={isEditing}
                        onChange={handleInputChange}
                        onSave={handleSave}
                        onCancel={() => setIsEditing(false)}
                        isLoading={isLoading}
                        onToggleEdit={() => setIsEditing(true)}
                    />

                    {stats && (
                        <AccountStats
                            storiesPlayed={stats.storiesPlayed}
                            storiesCompleted={stats.storiesCompleted}
                            accuracy={stats.accuracy}
                        />
                    )}

                    <DeleteAccountDialog
                        isOpen={isDeleteDialogOpen}
                        onClose={() => setIsDeleteDialogOpen(false)}
                        onConfirm={handleDelete}
                        cancelRef={React.createRef()}
                    />

                    <Button colorScheme="red" onClick={() => setIsDeleteDialogOpen(true)}>
                        Supprimer mon compte
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};

export default AccountPage;
