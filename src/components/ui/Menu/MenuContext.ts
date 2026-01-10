import { UseFloatingReturn } from '@floating-ui/react-dom';
import React, { createContext, useContext } from 'react';

/**
 * Context options for managing menu state and positioning.
 */
interface MenuContextOptions {
  /** Current open/closed state of the menu */
  isMenuOpen: boolean;
  /** Reference to the trigger button element */
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  /** Computed styles from Floating UI for positioning the menu */
  floatingStyles?: React.CSSProperties;
  /** References to reference and floating elements from Floating UI */
  refs?: UseFloatingReturn['refs'];
  /** Whether menu should close when an item is selected */
  closeOnSelect?: boolean;
  /** Maximum height available for the menu based on viewport constraints */
  maxHeight?: number;
  /** Function to update menu open/closed state */
  setIsMenuOpen: (value: boolean) => void;
  /** Unique ID for the menu element */
  menuId: string;
  /** Unique ID for the trigger button */
  triggerId: string;
  /** Currently focused menu item index for keyboard navigation */
  focusedIndex: number | null;
  /** Setter for focused menu item index */
  setFocusedIndex: (index: number | null) => void;
}

export const MenuContext = createContext<MenuContextOptions | null>(null);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return context;
};
