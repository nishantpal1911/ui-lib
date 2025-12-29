import React, { PropsWithChildren } from 'react';

import { Button } from 'src/components/ui';
import type { ButtonProps } from 'src/components/ui/Button';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';

type Props = ButtonProps;

export default function MenuTrigger({ children, onClick, ...props }: PropsWithChildren<Props>) {
  const { isMenuOpen, refs, setIsMenuOpen } = useMenuContext();

  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen(!isMenuOpen);
    onClick?.(event);
  };

  return (
    <Button ref={refs?.setReference} intent='tertiary' onClick={onClickHandler} {...props}>
      {children}
    </Button>
  );
}

export type { Props as MenuTriggerProps };
