import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '@chakra-ui/react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const toast = useToast();

  if (!isAuthenticated) {
    toast({
      title: "Accès refusé",
      description: "Vous devez être connecté pour accéder à cette page",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    
    // Rediriger vers la page de connexion tout en sauvegardant la page demandée
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 