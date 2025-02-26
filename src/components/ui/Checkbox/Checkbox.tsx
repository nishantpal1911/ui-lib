import { VariantProps } from 'class-variance-authority';
import { ComponentProps, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { tailwindCVA } from 'src/utils/cva';

interface CheckboxOptions extends VariantProps<typeof labelStyles> {
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
}

interface Props extends Omit<ComponentProps<'input'>, 'size'>, CheckboxOptions {}

const labelStyles = tailwindCVA('flex w-fit cursor-pointer items-center select-none', {
  variants: {
    labelPlacement: {
      left: 'flex-row-reverse',
      right: '',
    },
    size: {
      xs: 'text-xs gap-1.5',
      sm: 'text-sm gap-2',
      md: 'text-base gap-2',
      lg: 'text-base gap-2.5',
      xl: 'text-lg gap-3',
    },
    disabled: {
      true: 'text-gray-600 cursor-default',
    },
  },
  defaultVariants: {
    size: 'md',
    labelPlacement: 'right',
  },
});

const checkboxStyles = tailwindCVA('enabled:cursor-pointer', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4.5 w-4.5',
      xl: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const generateId = () => `Checkbox__${uuidv4()}`;

export default function Checkbox(props: Props) {
  const { className, disabled, indeterminate, label, labelPlacement, size, ...restProps } = props;
  const idRef = useRef(props.id || (label ? generateId() : undefined));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const Input = (
    <input
      id={idRef.current}
      ref={inputRef}
      type='checkbox'
      className={checkboxStyles({ size, className: !label && className })}
      disabled={disabled}
      {...restProps}
    />
  );

  return label ?
      <label htmlFor={idRef.current} className={labelStyles({ size, labelPlacement, disabled, className })}>
        {Input}
        <span>{label}</span>
      </label>
    : Input;
}

export type { CheckboxOptions, Props as CheckboxPropsExt };
