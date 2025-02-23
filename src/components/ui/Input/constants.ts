import { tailwindCVA } from 'src/utils/cva';

export const inputContainerStyles = tailwindCVA(
  'flex items-center justify-between rounded-md border border-gray-700 bg-white px-2 focus-within:ring-2 focus-within:ring-blue-300',
  {
    variants: {
      size: {
        sm: 'min-h-6 text-sm',
        md: 'min-h-7.5',
        lg: 'min-h-9',
      },
      rounded: {
        true: 'rounded-full px-3',
      },
    },
  }
);

export const inputStyles = tailwindCVA('h-full w-full focus-visible:outline-hidden', {
  variants: {
    disabled: {
      true: 'disabled:text-gray-600',
    },
  },
});
