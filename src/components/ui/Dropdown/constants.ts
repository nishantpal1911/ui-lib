import { cva } from 'class-variance-authority';

export const dropdownItemDefaultStyles = cva('block w-full px-4 py-2 text-start select-none', {
  variants: {
    showBgOnHover: { true: 'hover:bg-gray-100' },
  },
  defaultVariants: {
    showBgOnHover: true,
  },
});
