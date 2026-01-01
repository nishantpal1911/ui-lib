import React, { PropsWithChildren } from 'react';

import { Button } from 'src/components/ui';
import type { ButtonProps } from 'src/components/ui/Button';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';

type Props = ButtonProps;

/**
 * Button that triggers the menu open/close state.
 * Automatically manages the reference element for floating element positioning.
 */
export default function MenuTrigger({ children, onClick, ...props }: PropsWithChildren<Props>) {
  const { isMenuOpen, menuId, refs, setIsMenuOpen, triggerId } = useMenuContext();

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(!isMenuOpen);
    onClick?.(event);
  };

  return (
    <Button
      ref={refs?.setReference}
      id={triggerId}
      intent='tertiary'
      onClick={onClickHandler}
      aria-haspopup='menu'
      aria-expanded={isMenuOpen}
      aria-controls={menuId}
      {...props}
    >
      {children}
    </Button>
  );
}

export type { Props as MenuTriggerProps };
