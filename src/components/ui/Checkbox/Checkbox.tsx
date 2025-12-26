import { VariantProps } from 'class-variance-authority';
import { ComponentProps, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { tailwindCVA } from 'src/utils/cva';

interface CheckboxOptions extends VariantProps<typeof labelStyles> {
  indeterminate?: boolean;
  label?: string;
  disabled?: boolean;
  required?: boolean;
}

interface Props extends Omit<ComponentProps<'input'>, 'size'>, CheckboxOptions {}

const labelStyles = tailwindCVA('flex w-fit cursor-pointer items-center select-none', {
  variants: {
    labelPlacement: {
      left: 'flex-row-reverse',
      right: '',
    },
    size: {
      xs: 'text-sm gap-1.5',
      sm: 'text-base gap-2',
      md: 'text-lg gap-2',
      lg: 'text-xl gap-2.5',
      xl: 'text-2xl gap-3',
    },
    disabled: {
      true: 'text-gray-800 cursor-default',
    },
  },
  defaultVariants: {
    size: 'sm',
    labelPlacement: 'right',
  },
});

const checkboxStyles = tailwindCVA('enabled:cursor-pointer', {
  variants: {
    size: {
      xs: 'h-4 w-4',
      sm: 'h-4.5 w-4.5',
      md: 'h-5 w-5',
      lg: 'h-5.5 w-5.5',
      xl: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

const generateId = () => `Checkbox__${uuidv4()}`;

export default function Checkbox(props: Props) {
  const { className, disabled, indeterminate, label, labelPlacement, required, size, ...restProps } = props;
  const idRef = useRef(props.id || (label ? generateId() : undefined));
  const inputRef = useRef<HTMLInputElement>(null);

  // Accessibility warning: checkbox must have an accessible name
  useEffect(() => {
    if (import.meta.env.DEV && !label && !restProps['aria-label'] && !restProps['aria-labelledby']) {
      // eslint-disable-next-line no-console
      console.warn(
        'Checkbox: Must provide either a "label" prop, "aria-label", or "aria-labelledby" for accessibility.'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      required={required}
      aria-required={required}
      {...restProps}
    />
  );

  return label ?
      <label htmlFor={idRef.current} className={labelStyles({ size, labelPlacement, disabled, className })}>
        {Input}
        <span>
          {label}
          {required && (
            <span className='text-red-600' aria-hidden='true'>
              {' *'}
            </span>
          )}
        </span>
      </label>
    : Input;
}

export type { CheckboxOptions, Props as CheckboxPropsExt };
