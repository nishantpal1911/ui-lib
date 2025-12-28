import React, { createContext, useContext } from 'react';

interface MenuContextOptions {
  isMenuOpen: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  collapseOnSelect?: boolean;
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
