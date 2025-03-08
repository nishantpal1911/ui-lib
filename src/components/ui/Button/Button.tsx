import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';

import { LoadingSpinner } from 'src/components/ui';
import { tailwindCVA } from 'src/utils/cva';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface IconProps {
  svg: typeof SvgIcon;
  size?: IconSize;
  placement?: 'left' | 'right';
  styles?: SvgIconProps;
}

interface ButtonOptions extends Omit<VariantProps<typeof buttonStyles>, 'disabled' | 'icon' | 'iconPlacement'> {
  text?: string;
  icon?: IconProps;
  loading?: boolean;
}

interface Props extends ComponentProps<'button'>, ButtonOptions {}

const buttonStyles = tailwindCVA(
  `relative cursor-pointer gap-1 rounded-md transition-colors select-none focus:outline-offset-2`,
  {
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs',
        sm: 'px-2.5 py-1 text-sm',
        md: 'p-3 py-1.5',
        lg: 'px-4 py-2 gap-1.5',
        xl: 'px-4 py-2 text-lg gap-1.5',
      },
      intent: {
        primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
        secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm',
        tertiary: 'text-gray-600 bg-white hover:bg-gray-200 hover:text-black',
        danger: 'bg-danger hover:bg-danger/90 text-white shadow-sm',
        success: 'bg-success hover:bg-success/90 text-white',
        unstyled: 'border-0 p-0 inset-ring-0',
      },
      outlined: { true: '' },
      rounded: {
        true: 'rounded-full',
      },
      icon: {
        true: 'flex items-center',
      },
      iconPlacement: {
        left: '',
        right: 'flex-row-reverse',
      },
      disabled: {
        true: 'disabled:cursor-default disabled:border-0 disabled:bg-gray-200 disabled:text-white disabled:ring-0 disabled:shadow-none disabled:hover:bg-gray-200 disabled:hover:text-white disabled:hover:inset-ring-0 disabled:hover:shadow-none',
      },
    },
    defaultVariants: {
      intent: 'primary',
      outlined: false,
      size: 'md',
      iconPlacement: 'left',
    },
    compoundVariants: [
      {
        outlined: true,
        intent: 'primary',
        className: 'border-primary text-primary',
      },
      {
        outlined: true,
        intent: 'secondary',
        className: 'border-secondary text-secondary',
      },
      {
        outlined: true,
        intent: 'tertiary',
        className: 'border-gray-500',
      },
      {
        outlined: true,
        intent: 'danger',
        className: 'border-danger text-danger',
      },
      {
        outlined: true,
        intent: 'success',
        className: 'border-success text-success',
      },
      {
        intent: ['primary', 'secondary', 'tertiary', 'success', 'danger'],
        outlined: true,
        className: 'border bg-white shadow-none hover:bg-white hover:inset-ring',
      },
      {
        intent: 'unstyled',
        disabled: true,
        className:
          'disabled:bg-transparent disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400',
      },
    ],
  }
);

const invisibleStyle = (loading?: boolean) => (loading ? 'invisible' : '');

const iconSizeMap: Record<IconSize, string> = {
  xs: '1rem', // 16px
  sm: '1.125rem', // 18px
  md: '1.375rem', // 22px
  lg: '1.5rem', // 24px
  xl: '1.75rem', // 28px
  '2xl': '2rem', // 32px
};

const getIconSize = (size?: IconSize | null) => {
  if (!size) return;

  return iconSizeMap[size];
};

export default function Button({
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
  const iconSize = getIconSize(icon?.size || size);

  return (
    <button
      className={buttonStyles({
        intent,
        outlined,
        icon: !!icon,
        iconPlacement: icon?.placement,
        disabled: disabled || loading,
        size,
        rounded,
        className,
      })}
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
          className: invisibleStyle(loading),
          classes: { root: icon.styles?.className },
          sx: { height: iconSize, width: iconSize },
        } as SvgIconProps)}

      {text && <span className={invisibleStyle(loading)}>{text}</span>}

      {children && <div className={invisibleStyle(loading)}>{children}</div>}
    </button>
  );
}

export type {
  ButtonSize,
  ButtonOptions,
  Props as ButtonPropsExt,
  IconProps as ButtonIconProps,
  IconSize as ButtonIconSize,
};
