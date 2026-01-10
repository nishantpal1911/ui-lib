import Fade, { FadeProps } from '@mui/material/Fade';
import { cva } from 'class-variance-authority';
import React, { ComponentProps, PropsWithChildren, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { twMerge } from 'tailwind-merge';

import { OverlayScroll } from 'src/components/ui';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';
import { useOutlet } from 'src/hooks';

interface Props extends ComponentProps<'div'> {
  className?: string;
  eagerLoad?: boolean;
  transition?: FadeProps | boolean;
}

const dropdownStyles = (className?: string) => twMerge('py-2', className);

const portalRootStyles = cva('rounded-lg bg-white shadow-xl', {
  variants: {
    isHidden: {
      true: 'hidden',
    },
  },
});

/**
 * Memoized wrapper for the portal root element.
 * Handles transition animation and conditional rendering based on menu state.
 */
const PortalRootElement = React.memo(function ({
  children,
  eagerLoad,
  transition,
}: PropsWithChildren<{
  transition?: FadeProps | boolean;
  eagerLoad?: boolean;
}>) {
  const { floatingStyles, isMenuOpen, refs } = useMenuContext();
  const commonProps = {
    ref: refs?.setFloating,
    style: { ...floatingStyles, minWidth: refs?.reference.current?.getBoundingClientRect().width },
    className: portalRootStyles({ isHidden: !transition && !isMenuOpen }),
  };
  const transitionProps = {
    in: isMenuOpen,
    mountOnEnter: !eagerLoad,
    unmountOnExit: !eagerLoad,
    timeout: { enter: 100, exit: 50 },
    easing: 'ease-out',
    ...(typeof transition === 'object' && transition),
  };

  return transition ?
      <Fade {...commonProps} {...transitionProps}>
        <div>{children}</div>
      </Fade>
    : (eagerLoad || isMenuOpen) && <div {...commonProps}>{children}</div>;
});

/**
 * Container that renders menu items in a portal with scrollable content.
 * Handles outside click detection and automatic menu closure.
 */
export default function MenuContainer({
  children,
  className,
  eagerLoad = false,
  transition = false,
  ...restProps
}: PropsWithChildren<Props>) {
  const menuOutlet = useOutlet('DROPDOWN');
  const { focusedIndex, isMenuOpen, maxHeight, menuId, refs, setFocusedIndex, setIsMenuOpen, triggerId } =
    useMenuContext();

  /**
   * Close menu when clicking outside, but ignore clicks on the trigger button
   */
  const onOutsideClick = ({ target }: MouseEvent) => {
    const { current: triggerBtn } = refs?.reference || {};
    if (!isMenuOpen || !triggerBtn || (triggerBtn as HTMLElement).contains(target as Node)) return;
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!isMenuOpen) {
      setFocusedIndex(null);
      const { current: triggerBtn } = refs?.reference || {};
      if (triggerBtn) {
        (triggerBtn as HTMLElement).focus();
      }
    } else {
      setFocusedIndex(0);
    }
  }, [isMenuOpen, refs?.reference, setFocusedIndex]);

  /**
   * Handle keyboard navigation within the menu:
   * - ArrowDown: Move to next item
   * - ArrowUp: Move to previous item
   * - Home: Jump to first item
   * - End: Jump to last item
   * - Escape: Close menu and return focus to trigger
   * - Tab: Close menu and allow default tab behavior
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isMenuOpen) return;
      const menuItems = refs?.floating.current?.querySelectorAll<HTMLElement>('[data-js-menuitem]');
      if (!menuItems || menuItems.length === 0 || focusedIndex === null) return;

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault();
          setFocusedIndex((focusedIndex + 1) % menuItems.length);
          break;
        }
        case 'ArrowUp': {
          event.preventDefault();
          setFocusedIndex((focusedIndex - 1 + menuItems.length) % menuItems.length);
          break;
        }
        case 'Home': {
          event.preventDefault();
          setFocusedIndex(0);
          break;
        }
        case 'End': {
          event.preventDefault();
          setFocusedIndex(menuItems.length - 1);
          break;
        }
        case 'Escape': {
          event.preventDefault();
          setIsMenuOpen(false);
          break;
        }
        case 'Tab': {
          // Close menu and allow default tab behavior
          setIsMenuOpen(false);
          break;
        }
      }
    },
    [isMenuOpen, refs?.floating, focusedIndex, setFocusedIndex, setIsMenuOpen]
  );

  return (
    menuOutlet &&
    ReactDOM.createPortal(
      <PortalRootElement transition={transition} eagerLoad={eagerLoad}>
        <OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!isMenuOpen}>
          <OverlayScroll style={{ maxHeight: maxHeight && `${maxHeight}px` }}>
            {children && (
              <div
                role='menu'
                id={menuId}
                aria-labelledby={triggerId}
                aria-orientation='vertical'
                onKeyDown={handleKeyDown}
                className={dropdownStyles(className)}
                {...restProps}
              >
                {children}
              </div>
            )}
          </OverlayScroll>
        </OutsideClickHandler>
      </PortalRootElement>,
      menuOutlet
    )
  );
}

export type { Props as MenuContainerProps };
