import React, { createContext, useContext, type ReactNode } from 'react';
import type { AuthContextType } from './authContextTypes';
import { useAuthProviderLogic } from './useAuthProviderLogic';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuthProviderLogic();

  return (
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
