import { cva, cx } from 'class-variance-authority';
import React from 'react';

import { Button } from 'src/components/ui';
import type { ButtonProps } from 'src/components/ui/Button';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';
import { TextOrChildren } from 'src/types';

type Props = TextOrChildren & { isSelected?: boolean } & ButtonProps;

// Visual indicator for selected menu items (left border highlight)
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

/**
 * Individual menu item that can be selected and optionally highlighted.
 * Supports automatic menu closure on selection via closeOnSelect prop.
 */
export default function MenuItem({ children, className, isSelected, onClick, ...restProps }: Props) {
  const { closeOnSelect, setIsMenuOpen } = useMenuContext();
  const shouldHighlightItem = isSelected && !restProps.disabled;

  const selectHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (closeOnSelect) {
      setIsMenuOpen(false);
    }
    onClick?.(event);
  };

  return (
    <Button
      data-js-menuitem
      role='menuitem'
      tabIndex={-1}
      intent='tertiary'
      onClick={selectHandler}
      className={cx(
        'w-full rounded-none text-left transition-none focus-visible:ring-0 focus-visible:inset-ring-2',
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
