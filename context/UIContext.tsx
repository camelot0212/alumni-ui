import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

export interface UIContextType {
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
  
  // Contact Modal State
  contactUser: User | null;
  openContactModal: (user: User) => void;
  closeContactModal: () => void;

  showToast: (message: string, type?: 'success' | 'error') => void;
}

export const UIContext = createContext<UIContextType>({
  isCreatePostOpen: false,
  openCreatePost: () => {},
  closeCreatePost: () => {},
  
  contactUser: null,
  openContactModal: () => {},
  closeContactModal: () => {},

  showToast: () => {},
});

export const useUI = () => useContext(UIContext);

interface UIProviderProps {
  children: ReactNode;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children, showToast }) => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [contactUser, setContactUser] = useState<User | null>(null);

  const value = {
    isCreatePostOpen,
    openCreatePost: () => setIsCreatePostOpen(true),
    closeCreatePost: () => setIsCreatePostOpen(false),
    
    contactUser,
    openContactModal: (user: User) => setContactUser(user),
    closeContactModal: () => setContactUser(null),

    showToast
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};