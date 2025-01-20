import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, AuthState, LoginCredentials, RegisterCredentials } from '../../types/auth';
import { User } from '../../types/room';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('user');
    return {
      user: savedUser ? JSON.parse(savedUser) : null,
      isAuthenticated: !!savedUser
    };
  });

  const login = async (credentials: LoginCredentials) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      // For testing: if email contains 'admin', create admin user
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        email: credentials.email,
        role: credentials.email.includes('admin') ? 'admin' : 'user'
      };
      
      setAuthState({ user: mockUser, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      const mockUser: User = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
        role: 'user'
      };
      
      setAuthState({ user: mockUser, isAuthenticated: true });
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
