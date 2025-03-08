import { cva } from 'class-variance-authority';
import React from 'react';

import { Checkbox } from 'src/components/ui';
import type { ButtonSize } from 'src/components/ui/Button';
import { dropdownItemDefaultClasses } from 'src/components/ui/Dropdown/Item';

interface Props {
  text: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value?: string) => void;
  size?: ButtonSize;
  /**
   * For internal use by `Dropdown` component only
   */
  onSelectInternal?: (node: React.ReactNode) => void;
}

const styles = cva(`${dropdownItemDefaultClasses} hover:bg-gray-200`, {
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2 py-1.5 text-sm',
      md: 'px-2.5 py-2',
      lg: 'px-3 py-2',
      xl: 'px-3 py-2.5 text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function DropdownItemCheckbox(props: Props) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(event, props.value);
    props.onSelectInternal?.(props.value);
  };

  return (
    <Checkbox
      size={props.size}
      label={props.text}
      className={styles({ size: props.size, className: props.className })}
      checked={props.checked}
      indeterminate={props.indeterminate}
      disabled={props.disabled}
      onChange={onChangeHandler}
    />
  );
}

export type { Props as DropdownItemCheckboxProps };
