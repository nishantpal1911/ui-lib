import { PropsWithChildren, useCallback, useRef } from 'react';

import MenuContainer from 'src/components/ui/Menu/MenuContainer';
import { MenuContext } from 'src/components/ui/Menu/MenuContext';
import MenuItem from 'src/components/ui/Menu/MenuItem';
import MenuItemCheckbox from 'src/components/ui/Menu/MenuItemCheckbox';
import MenuTrigger from 'src/components/ui/Menu/MenuTrigger';

interface Props {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  collapseOnSelect?: boolean;
}

function Menu({ children, closeMenu, collapseOnSelect, isOpen, openMenu }: PropsWithChildren<Props>) {
  const setIsMenuOpen = useCallback(
    (open: boolean) => {
      if (open) {
        openMenu();
      } else {
        closeMenu();
      }
    },
    [openMenu, closeMenu]
  );
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <MenuContext.Provider value={{ isMenuOpen: isOpen, setIsMenuOpen, collapseOnSelect, triggerRef }}>
      {children}
    </MenuContext.Provider>
  );
}

Menu.Trigger = MenuTrigger;
Menu.Container = MenuContainer;
Menu.Item = MenuItem;
Menu.ItemCheckbox = MenuItemCheckbox;

export default Menu;
export type { Props as MenuRootProps };
