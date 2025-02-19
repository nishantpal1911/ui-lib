import { cva, VariantProps } from 'class-variance-authority';
import ReactDOM from 'react-dom';

import css from 'src/styles/ui/Loader.module.css';

interface Props extends VariantProps<typeof styles> {
  className?: string;
}

const styles = cva(`${css.spin} z-[9999] inline-block rounded-full border-slate-200 border-t-teal-500`, {
  variants: {
    size: {
      none: 'h-full max-h-12 w-full max-w-12 border-2',
      xs: 'h-4 w-4 border-2',
      sm: 'h-5 w-5 border-2',
      md: 'h-6 w-6 border-[3px]',
      lg: 'h-7 w-7 border-[3px]',
      xl: 'h-9 w-9 border-4',
      '2xl': 'h-12 w-12 border-4',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export function PageLoader() {
  return ReactDOM.createPortal(
    <div className='bg-opacity-80 fixed top-0 left-0 z-[9999] min-h-lvh w-full bg-gray-300 p-4 backdrop-blur-xs'>
      <LoadingSpinner size='2xl' className='fixed top-1/3 right-0 left-0 mx-auto' />
    </div>,
    document.getElementById('page-loader-outlet') as HTMLElement
  );
}

export function ContainerLoader() {
  return (
    <div className='absolute top-0 left-0 z-50 h-full w-full p-4 backdrop-blur-xs'>
      <LoadingSpinner size='xl' className='absolute top-1/3 right-0 left-0 mx-auto' />
    </div>
  );
}

/**
 * Always specify value of `size`. If `size=none` is specified, use within a div with a fixed height & width
 */
export function LoadingSpinner({ className, size }: Props) {
  return <div className={styles({ className, size })}></div>;
}
