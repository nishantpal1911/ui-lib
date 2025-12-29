import { UseFloatingReturn } from '@floating-ui/react-dom';
import React, { createContext, useContext } from 'react';

interface MenuContextOptions {
  isMenuOpen: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  floatingStyles?: React.CSSProperties;
  refs?: UseFloatingReturn['refs'];
  closeOnSelect?: boolean;
  maxHeight?: number;
  setIsMenuOpen: (value: boolean) => void;
}

export const MenuContext = createContext<MenuContextOptions | null>(null);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return context;
};
