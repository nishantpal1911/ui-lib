import { cva, cx } from 'class-variance-authority';
import React from 'react';

import { Button } from 'src/components/ui';
import type { ButtonProps } from 'src/components/ui/Button';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';
import { TextOrChildren } from 'src/types';

type Props = TextOrChildren & { isSelected?: boolean } & ButtonProps;

export const dropdownItemDefaultClasses = 'w-full text-left';

const highlighterStyles = cva('absolute top-0 bottom-0 left-0 bg-blue-200', {
  variants: {
    size: {
      xs: 'w-0.5',
      sm: 'w-[3px]',
      md: 'w-[3px]',
      lg: 'w-1',
      xl: 'w-1',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function MenuItem({ children, className, isSelected, onClick, ...restProps }: Props) {
  const { collapseOnSelect, setIsMenuOpen } = useMenuContext();
  const shouldHighlightItem = isSelected && !restProps.disabled;

  const selectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (collapseOnSelect) {
      setIsMenuOpen(false);
    }
    onClick?.(event);
  };

  return (
    <Button
      intent='tertiary'
      onClick={selectHandler}
      className={cx(
        dropdownItemDefaultClasses,
        'rounded-none transition-none',
        shouldHighlightItem && 'bg-blue-50 hover:bg-blue-50',
        className
      )}
      {...restProps}
    >
      {shouldHighlightItem && <div className={highlighterStyles({ size: restProps.size })} />}
      {children}
    </Button>
  );
}

export type { Props as MenuItemProps };
