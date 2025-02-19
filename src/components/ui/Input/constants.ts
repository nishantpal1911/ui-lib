import { cva } from 'class-variance-authority';

export const inputStyles = cva('h-full w-full min-w-12 focus-visible:outline-hidden', {
  variants: {
    disabled: {
      true: 'text-gray-600',
    },
  },
});

export const inputContainerStyles = cva(
  'flex h-10 max-h-12 items-center justify-between rounded-md border border-gray-600 bg-white px-3 focus-within:ring-2 focus-within:ring-blue-500',
  {
    variants: {
      rounded: {
        true: 'rounded-full! px-5',
      },
    },
  }
);
