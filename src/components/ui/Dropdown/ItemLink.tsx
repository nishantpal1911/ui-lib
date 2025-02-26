import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { NavLink, NavLinkProps, To } from 'react-router-dom';

import type { ButtonSize } from 'src/components/ui/Button';
import { dropdownItemDefaultClasses } from 'src/components/ui/Dropdown/Item';
import { TextOrChildren } from 'src/types';
import { tailwindCVA } from 'src/utils/cva';

type DropdownItemLinkOptions = {
  to: To;
  value?: string;
  size?: ButtonSize;
  isExternal?: boolean;
  showActiveBg?: boolean;
} & TextOrChildren;

type Props = DropdownItemLinkOptions &
  NavLinkProps & {
    /**
     * For internal use by `Dropdown` component only
     */
    onSelectInternal?: (value?: string) => void;
  };

const styles = tailwindCVA(`${dropdownItemDefaultClasses} no-underline hover:bg-blue-50 flex items-center gap-2`, {
  variants: {
    size: {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-2.5 py-1 text-sm',
      md: 'p-3 py-1.5',
      lg: 'px-4 py-2',
      xl: 'px-4 py-2 text-lg',
    },
    isActive: {
      true: 'bg-blue-50/20',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export default function DropdownItemLink({
  children,
  isExternal,
  onSelectInternal,
  showActiveBg = false,
  size,
  text,
  to,
  value,
}: Props & TextOrChildren) {
  return (
    <NavLink
      to={to}
      onClick={() => onSelectInternal?.(value)}
      className={({ isActive }) => styles({ size, isActive: showActiveBg && isActive })}
    >
      {text || children}
      {isExternal && <OpenInNewIcon color='info' sx={{ height: '0.75rem', width: '0.75rem' }} />}
    </NavLink>
  );
}

export type { DropdownItemLinkOptions, Props as DropdownItemLinkPropsExt };
