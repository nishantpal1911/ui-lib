import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { LoadingSpinner } from 'src/components/ui/Loader';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface IconProps {
  svg: typeof SvgIcon;
  size?: IconSize;
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

const buttonStyles = cva(`relative cursor-pointer rounded-md transition-colors select-none focus:outline-offset-2`, {
  variants: {
    intent: {
      primary: 'bg-primary hover:bg-primary/90 text-white shadow-sm',
      secondary: 'bg-secondary hover:bg-secondary/90 text-white shadow-sm',
      tertiary: 'text-gray-600 hover:bg-gray-200 hover:text-black',
      danger: 'bg-danger hover:bg-danger/90 text-white shadow-sm',
      success: 'bg-success hover:bg-success/90 text-white',
      unstyled: 'has-[*]:border-0 has-[*]:p-0 hover:has-[*]:inset-ring-0',
    },
    outlined: {
      true: 'border bg-transparent shadow-none hover:bg-transparent hover:inset-ring',
    },
    rounded: {
      true: 'rounded-full',
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
      true: 'disabled:cursor-default disabled:border-0 disabled:bg-gray-300 disabled:text-white disabled:ring-0 disabled:shadow-none disabled:hover:bg-gray-300 disabled:hover:text-white disabled:hover:inset-ring-0 disabled:hover:shadow-none',
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
      intent: 'unstyled',
      disabled: true,
      className:
        'disabled:bg-transparent disabled:text-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400',
    },
  ],
});

const contentStyles = cva('', {
  variants: {
    loading: {
      true: 'invisible',
    },
  },
});

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
  const iconSize = getIconSize(icon?.size || size);

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
          className: contentStyles({ loading }),
          classes: { root: icon.styles?.className },
          sx: { height: iconSize, width: iconSize },
        } as SvgIconProps)}

      {text && <span className={contentStyles({ loading })}>{text}</span>}

      {children && <div className={contentStyles({ loading })}>{children}</div>}
    </button>
  );
}

export type { IconProps as ButtonIconProps };
