import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { LoadingSpinner } from 'src/components/ui/Loader';
import css from 'src/styles/ui/Button.module.css';

interface IconProps {
  svg: typeof SvgIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  placement?: 'left' | 'right';
  styles?: SvgIconProps;
}

interface ButtonProps {
  text?: string;
  icon?: IconProps;
  loading?: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
}

interface Props
  extends ComponentProps<'button'>,
    Omit<VariantProps<typeof buttonStyles>, 'disabled' | 'icon' | 'iconPlacement'>,
    ButtonProps {}

// TODO: Remove bg-opacity
const buttonStyles = cva(
  `${css.transition} hover:bg-opacity-90 relative cursor-pointer rounded-md select-none focus:outline-offset-2`,
  {
    variants: {
      intent: {
        primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
        secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm',
        tertiary: 'text-gray-500 hover:bg-gray-50 hover:text-gray-700',
        danger: 'bg-danger hover:bg-danger/90 text-white shadow-sm',
        success: 'bg-success hover:bg-success/90 text-white',
        unstyled: 'has-[*]:p-0',
      },
      outlined: {
        true: 'border shadow-none has-[*]:bg-white',
      },
      rounded: {
        true: 'has-[*]:rounded-full',
      },
      size: {
        xs: 'p-2 text-xs',
        sm: 'p-2 text-sm',
        md: 'px-3 py-2',
        lg: 'px-4 py-2 text-lg',
      },
      icon: {
        true: 'flex items-center gap-1',
      },
      iconPlacement: {
        left: '',
        right: 'flex-row-reverse',
      },
      disabled: {
        true: 'disabled:hover:bg-opacity-100 disabled:border-0 disabled:ring-0 disabled:shadow-none disabled:hover:bg-gray-300 disabled:hover:text-white disabled:hover:shadow-none disabled:has-[*]:bg-gray-300 disabled:has-[*]:text-white',
      },
    },
    defaultVariants: {
      intent: 'primary',
      outlined: false,
      size: 'md',
      iconPlacement: 'left',
    },
    compoundVariants: [
      { size: 'xs', icon: true, className: 'p-1' },
      {
        outlined: true,
        intent: 'primary',
        className:
          'border-primary hover:border-primary-hover hover:bg-primary/5 hover:text-primary-hover has-[*]:text-primary',
      },
      {
        outlined: true,
        intent: 'tertiary',
        className: 'border-gray-500 hover:border-gray-700',
      },
      {
        outlined: true,
        intent: 'danger',
        className: 'border-danger hover:bg-danger/5 has-[*]:text-danger',
      },
      {
        outlined: true,
        intent: 'success',
        className: 'border-success hover:bg-success/5 has-[*]:text-success',
      },
      {
        intent: 'unstyled',
        disabled: true,
        className:
          'disabled:has-[*]:bg-transparent disabled:hover:has-[*]:bg-transparent disabled:hover:has-[*]:text-gray-400 disabled:has-[*]:has-[span,path]:text-gray-400',
      },
    ],
  }
);

const contentStyles = cva('', {
  variants: {
    loading: {
      true: 'invisible',
    },
  },
});

const iconStyles = cva('', {
  variants: {
    // Adding has-[path]: pseudo selector to increase specificity
    size: {
      xs: 'has-[path]:h-4 has-[path]:w-4',
      sm: 'has-[path]:h-[18px] has-[path]:w-[18px]',
      md: 'has-[path]:h-[22px] has-[path]:w-[22px]',
      lg: 'has-[path]:h-6 has-[path]:w-6',
      xl: 'has-[path]:h-7 has-[path]:w-7',
      '2xl': 'has-[path]:h-8 has-[path]:w-8',
    },
  },
});

export default function Button({
  buttonRef,
  children,
  className,
  disabled,
  icon,
  intent,
  loading,
  onClick,
  outlined,
  rounded,
  size = 'md',
  text,
  type,
  ...restProps
}: Props) {
  return (
    <button
      ref={buttonRef}
      className={twMerge(
        buttonStyles({
          intent,
          outlined,
          icon: !!icon,
          iconPlacement: icon?.placement,
          disabled: disabled || loading,
          size,
          rounded,
        }),
        className
      )}
      type={type || 'button'}
      disabled={disabled || loading}
      onClick={onClick}
      {...restProps}
    >
      {loading && <LoadingSpinner size={size} className='absolute right-0 left-0 mx-auto' />}

      {icon &&
        React.createElement(icon.svg, {
          ...icon.styles,
          ...(disabled && intent === 'unstyled' && { color: 'disabled' }),
          className: `${contentStyles({ loading })} ${iconStyles({ size: icon.size || size })} ${icon.styles?.className || ''}`,
        })}

      {text && <span className={contentStyles({ loading })}>{text}</span>}

      {children && <div className={contentStyles({ loading })}>{children}</div>}
    </button>
  );
}

export type { IconProps as ButtonIconProps };
