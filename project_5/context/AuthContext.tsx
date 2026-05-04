import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email?: string, password?: string) => boolean;
  register: (name?: string, email?: string, password?: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Моковий юзер для перевірки
const MOCK_USER = {
  email: 'test@example.com',
  password: 'password123'
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = (email?: string, password?: string) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const register = (name?: string, email?: string, password?: string) => {
    if (name && email && password) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
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
