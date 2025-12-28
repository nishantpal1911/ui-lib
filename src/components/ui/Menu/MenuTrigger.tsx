import { PropsWithChildren } from 'react';

import { Button } from 'src/components/ui';
import type { ButtonProps } from 'src/components/ui/Button';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';

type Props = ButtonProps;

export default function MenuTrigger({ children, ...props }: PropsWithChildren<Props>) {
  const { isMenuOpen, setIsMenuOpen, triggerRef } = useMenuContext();

  return (
    <Button ref={triggerRef} intent='tertiary' onClick={() => setIsMenuOpen(!isMenuOpen)} {...props}>
      {children}
    </Button>
  );
}

export type { Props as MenuTriggerProps };
