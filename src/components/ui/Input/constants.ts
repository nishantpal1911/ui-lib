import { cva } from 'class-variance-authority';

import { tailwindCVA } from 'src/utils/cva';

export const inputContainerStyles = tailwindCVA(
  'flex items-center justify-between rounded-md border border-gray-700 bg-white focus-within:ring-2 focus-within:ring-blue-400',
  {
    variants: {
      size: {
        xs: 'min-h-6 text-xs px-2',
        sm: 'min-h-7.5 text-sm px-3',
        md: 'min-h-9 px-3',
        lg: 'min-h-10 px-3.5',
      },
      rounded: {
        true: 'rounded-full px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
    compoundVariants: [
      { size: 'xs', rounded: true, className: 'px-3' },
      { size: 'sm', rounded: true, className: 'px-3.5' },
      { size: 'md', rounded: true, className: 'px-4' },
      { size: 'lg', rounded: true, className: 'px-4.5' },
    ],
  }
);

export const inputStyles = tailwindCVA('h-full w-full focus-visible:outline-hidden', {
  variants: {
    disabled: {
      true: 'disabled:text-gray-600',
    },
  },
});

export const labelStyles = cva('mb-2 w-fit font-medium', {
  variants: {
    size: {
      xs: 'text-sm',
      sm: 'text-base',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
});
