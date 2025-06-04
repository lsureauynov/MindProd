import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useToast } from '@chakra-ui/react';
import authService from '../services/authService';
import type { LoginCredentials, RegisterCredentials } from '../services/authService';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Vérifier l'authentification au chargement
    const checkAuth = async () => {
      try {
        const token = authService.getAccessToken();
        if (token) {
          // Tenter de rafraîchir le token
          const tokens = await authService.refreshToken();
          setIsAuthenticated(!!tokens);
        }
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      await authService.login(credentials);
      setIsAuthenticated(true);
      toast({
        title: "Connexion réussie",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erreur de connexion:', error);
      toast({
        title: "Erreur de connexion",
        description: "Vérifiez vos identifiants et réessayez",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setIsLoading(true);
      await authService.register(credentials);
      setIsAuthenticated(true);
      toast({
        title: "Inscription réussie",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    toast({
      title: "Déconnexion réussie",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 