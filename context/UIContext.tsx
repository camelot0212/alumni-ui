
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UIContextType {
  isCreatePostOpen: boolean;
  openCreatePost: () => void;
  closeCreatePost: () => void;
  showToast: (message: string) => void;
  contactUser: User | null;
  openContactModal: (user: User) => void;
  closeContactModal: () => void;
}

const UIContext = createContext<UIContextType>({
  isCreatePostOpen: false,
  openCreatePost: () => {},
  closeCreatePost: () => {},
  showToast: () => {},
  contactUser: null,
  openContactModal: () => {},
  closeContactModal: () => {},
});

export const useUI = () => useContext(UIContext);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [contactUser, setContactUser] = useState<User | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <UIContext.Provider value={{
      isCreatePostOpen,
      openCreatePost: () => setIsCreatePostOpen(true),
      closeCreatePost: () => setIsCreatePostOpen(false),
      showToast,
      contactUser,
      openContactModal: setContactUser,
      closeContactModal: () => setContactUser(null)
    }}>
      {children}
      {toastMsg && (
        <div className="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-gray-900/90 backdrop-blur text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3 text-sm font-medium">
            {toastMsg}
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
};
