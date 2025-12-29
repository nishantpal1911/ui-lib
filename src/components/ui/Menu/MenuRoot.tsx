import { autoUpdate, flip, Placement, shift, size, useFloating } from '@floating-ui/react-dom';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import MenuContainer from 'src/components/ui/Menu/MenuContainer';
import { MenuContext } from 'src/components/ui/Menu/MenuContext';
import MenuItem from 'src/components/ui/Menu/MenuItem';
import MenuItemCheckbox from 'src/components/ui/Menu/MenuItemCheckbox';
import MenuTrigger from 'src/components/ui/Menu/MenuTrigger';

interface Props {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  placement?: Placement;
  closeOnSelect?: boolean;
  closeOnContainerScroll?: boolean;
}

const OVERFLOW_PADDING_OFFSET = 8;

function Menu({
  children,
  closeMenu,
  closeOnContainerScroll = true,
  closeOnSelect = false,
  isOpen,
  openMenu,
  placement = 'bottom',
}: PropsWithChildren<Props>) {
  const [maxHeight, setMaxHeight] = useState<number>();
  const { elements, floatingStyles, refs, update } = useFloating({
    open: isOpen,
    middleware: [
      shift({ padding: OVERFLOW_PADDING_OFFSET }),
      flip({ padding: OVERFLOW_PADDING_OFFSET, fallbackStrategy: 'bestFit' }),
      size({
        padding: OVERFLOW_PADDING_OFFSET,
        apply({ availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            maxHeight: `${availableHeight}px`,
          });
          setMaxHeight(availableHeight);
        },
      }),
    ],
    placement,
  });
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

  useEffect(() => {
    if (isOpen && elements.reference && elements.floating) {
      return autoUpdate(elements.reference, elements.floating, update);
    }
  }, [isOpen, elements, update]);

  useEffect(() => {
    if (isOpen) {
      const handleScroll = (ev: Event) => {
        if (refs.floating?.current?.contains(ev.target as Node)) return;
        setIsMenuOpen(false);
      };
      const handleResize = () => {
        setIsMenuOpen(false);
      };

      if (closeOnContainerScroll) {
        window.addEventListener('scroll', handleScroll);
      }
      window.addEventListener('resize', handleResize);

      return () => {
        if (closeOnContainerScroll) {
          window.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, refs.floating, setIsMenuOpen, closeOnContainerScroll]);

  return (
    <MenuContext.Provider value={{ isMenuOpen: isOpen, setIsMenuOpen, closeOnSelect, floatingStyles, refs, maxHeight }}>
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
