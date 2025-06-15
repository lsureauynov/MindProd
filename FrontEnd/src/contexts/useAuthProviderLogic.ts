import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

import authService from '../services/authService';
import userService from '../services/userService';
import type {
    LoginCredentials,
    RegisterCredentials,
    UserProfile
} from '../services/userTypes';

export const useAuthProviderLogic = () => {
    const toast = useToast();

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserProfile | null>(null);

    const fetchUser = async () => {
        try {
            const profile = await userService.getCurrentUser();
            setUser(profile);
        } catch (error) {
            console.error('Impossible de récupérer le profil utilisateur', error);
            setUser(null);
        }
    };

    const checkAuth = async () => {
        try {
            const token = authService.getAccessToken();
            if (token) {
                const tokens = await authService.refreshToken();
                setIsAuthenticated(!!tokens);
                await fetchUser();
            }
        } catch (error) {
            console.error("Erreur de vérification d'authentification:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            await authService.login(credentials);
            setIsAuthenticated(true);
            await fetchUser();
            toast({
                title: 'Connexion réussie',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
        } catch (error) {
            console.error('Erreur de connexion:', error);
            toast({
                title: 'Erreur de connexion',
                description: 'Vérifiez vos identifiants et réessayez',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials: RegisterCredentials): Promise<UserProfile> => {
        setIsLoading(true);
        try {
            const userProfile = await authService.register(credentials);
            
            setIsAuthenticated(true);
            
            await fetchUser();
            
            toast({
                title: 'Inscription réussie',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            
            return userProfile;
        } catch (error) {
            console.error("Erreur d'inscription:", error);
            toast({
                title: "Erreur d'inscription",
                description: "Une erreur est survenue lors de l'inscription",
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
        toast({
            title: 'Déconnexion réussie',
            status: 'success',
            duration: 3000,
            isClosable: true
        });
    };

    return {
        isAuthenticated,
        isLoading,
        user,
        login,
        register,
        logout,
        fetchUser
    };
};
