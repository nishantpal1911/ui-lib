import { autoUpdate, flip, Placement, shift, size, useFloating } from '@floating-ui/react-dom';
import { PropsWithChildren, useCallback, useEffect, useId, useState } from 'react';

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
  /** Whether to close the menu when an item is selected */
  closeOnSelect?: boolean;
  /** Whether to close the menu when a scroll event occurs outside the menu */
  closeOnContainerScroll?: boolean;
}

// Padding offset to prevent menu from touching viewport edges
const OVERFLOW_PADDING_OFFSET = 8;

/**
 * Root Menu component that provides floating positioning and state management.
 */
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Generate unique IDs for ARIA attributes
  const menuId = useId();
  const triggerId = useId();

  /**
   * Configure floating UI with middleware for smart positioning:
   * - shift: moves menu to stay within viewport
   * - flip: flips menu to opposite side if no space
   * - size: calculates available height and constrains menu size
   */
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

  // Auto-update floating position when reference or floating elements move/resize
  useEffect(() => {
    if (isOpen && elements.reference && elements.floating) {
      return autoUpdate(elements.reference, elements.floating, update);
    }
  }, [isOpen, elements, update]);

  // Close menu on scroll (if enabled) or window resize to prevent misalignment
  useEffect(() => {
    if (isOpen) {
      const handleScroll = (ev: Event) => {
        // Ignore scroll events within the menu itself
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

  const setFocusedIdx = useCallback(
    (index: number | null) => {
      setFocusedIndex(index);
      const menuItems = refs?.floating.current?.querySelectorAll<HTMLElement>('[data-js-menuitem]');
      if (menuItems?.length && index !== null && menuItems[index]) {
        menuItems[index].focus({ preventScroll: true });
      }
    },
    [refs?.floating]
  );

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: isOpen,
        setIsMenuOpen,
        closeOnSelect,
        floatingStyles,
        refs,
        maxHeight,
        menuId,
        triggerId,
        focusedIndex,
        setFocusedIndex: setFocusedIdx,
      }}
    >
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
