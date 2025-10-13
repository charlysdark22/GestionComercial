import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@shared/types';
import { STORAGE_KEYS } from '@shared/constants';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const savedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (savedToken) {
        setToken(savedToken);
        // Simulación de usuario - en producción sería una llamada a la API
        setUser({
          id: '1',
          email: 'admin@crm.com',
          name: 'Administrador',
          role: 'admin' as any,
          company: 'CRM Solutions',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulación de login
      if (email === 'admin@crm.com' && password === 'admin123') {
        const mockToken = 'mock-jwt-token';
        const mockUser: User = {
          id: '1',
          email,
          name: 'Administrador',
          role: 'admin' as any,
          company: 'CRM Solutions',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
        setToken(mockToken);
        setUser(mockUser);
      } else {
        throw new Error('Credenciales inválidas');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
      ]);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!token && !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}