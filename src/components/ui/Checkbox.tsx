import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size'>, VariantProps<typeof labelStyles> {
  indeterminate?: boolean;
  label?: string;
}

const labelStyles = cva('flex w-fit cursor-pointer items-center gap-2 select-none', {
  variants: {
    labelPlacement: {
      left: 'flex-row-reverse',
      right: '',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
    labelPlacement: 'right',
  },
});

const checkboxStyles = cva('cursor-pointer', {
  variants: {
    size: {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const generateId = () => `Checkbox__${uuidv4()}`;

export default function Checkbox(props: CheckboxProps) {
  const { className, indeterminate, label, labelPlacement, size, ...restProps } = props;
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
      {...restProps}
    />
  );

  return label ?
      <label htmlFor={idRef.current} className={labelStyles({ size, className, labelPlacement })}>
        {Input}
        <span>{label}</span>
      </label>
    : Input;
}
