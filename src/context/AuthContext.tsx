import React, { createContext, useContext, useState } from 'react';
import { User, AuthContextType } from '../types';
import { readUserAccounts, addUserAccount } from '../utils/userAccounts';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string, password: string) => {
    const accounts = await readUserAccounts();
    const account = accounts.find(acc => acc.username === username && acc.password === password);
    
    if (!account) {
      throw new Error('Geçersiz kullanıcı adı veya şifre');
    }

    const newUser = { 
      id: account.id, 
      username: account.username,
      status: 'active' as const
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const register = async (username: string, password: string) => {
    const accounts = await readUserAccounts();
    
    if (accounts.some(acc => acc.username === username)) {
      throw new Error('Bu kullanıcı adı zaten kullanılıyor');
    }

    const newAccount = {
      id: Date.now().toString(),
      username,
      password
    };

    await addUserAccount(newAccount);

    const newUser = { 
      id: newAccount.id, 
      username: newAccount.username,
      status: 'active' as const
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const deleteAccount = () => {
    // Implementation for deleting account
    logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};