import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { useSound } from './SoundContext';

interface UIContextType {
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  openLogin: () => void;
  openRegister: () => void;
  closeAuthModal: () => void;
  
  isReviewModalOpen: boolean;
  reviewCasinoId: string | null;
  openReviewModal: (casinoId?: string) => void;
  closeReviewModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { playSound } = useSound();
  
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewCasinoId, setReviewCasinoId] = useState<string | null>(null);

  const openLogin = useCallback(() => {
    playSound('ui_open');
    setAuthModalTab('login');
    setIsAuthModalOpen(true);
  }, [playSound]);

  const openRegister = useCallback(() => {
    playSound('ui_open');
    setAuthModalTab('register');
    setIsAuthModalOpen(true);
  }, [playSound]);

  const closeAuthModal = useCallback(() => {
    playSound('ui_close');
    setIsAuthModalOpen(false);
  }, [playSound]);
  
  const openReviewModal = useCallback((casinoId?: string) => {
    playSound('ui_open');
    setReviewCasinoId(casinoId || null);
    setIsReviewModalOpen(true);
  }, [playSound]);
  
  const closeReviewModal = useCallback(() => {
    playSound('ui_close');
    setIsReviewModalOpen(false);
  }, [playSound]);

  return (
    <UIContext.Provider value={{ 
        isAuthModalOpen, authModalTab, openLogin, openRegister, closeAuthModal,
        isReviewModalOpen, reviewCasinoId, openReviewModal, closeReviewModal
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
