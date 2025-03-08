import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { JSX } from 'react';

import type { ButtonSize } from 'src/components/ui/Button';
import { dropdownItemDefaultClasses } from 'src/components/ui/Dropdown/Item';
import { tailwindCVA } from 'src/utils/cva';

interface RenderArgs {
  classNameFn: (isActive?: boolean) => string;
  onClick: () => void;
  ExternalIcon: JSX.Element;
}

type DropdownItemLinkOptions = {
  render: (args: RenderArgs) => JSX.Element;
  value?: string;
  size?: ButtonSize;
};

type Props = DropdownItemLinkOptions & {
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

export default function DropdownItemLink({ onSelectInternal, render, size, value }: Props) {
  return render({
    classNameFn: (isActive?: boolean) => styles({ size, isActive }),
    onClick: () => onSelectInternal?.(value),
    ExternalIcon: <OpenInNewIcon color='info' sx={{ height: '0.75rem', width: '0.75rem' }} />,
  });
}

export type { DropdownItemLinkOptions, Props as DropdownItemLinkPropsExt, RenderArgs as DropdownItemLinkRenderArgs };
