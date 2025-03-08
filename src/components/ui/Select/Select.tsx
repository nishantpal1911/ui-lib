import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { cva } from 'class-variance-authority';
import React, { JSX, PropsWithChildren, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'src/components/ui';
import type { ButtonSize } from 'src/components/ui/Button';
import { tailwindCVA } from 'src/utils/cva';

interface Props {
  id?: string;
  label?: string;
  selectedOption?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: {
    svg: typeof SvgIcon;
    styles?: SvgIconProps;
  };
  // Styling
  className?: string;
  containerClass?: string;
  rounded?: boolean;
  size?: ButtonSize;
}

const labelStyles = cva('mb-2 w-fit font-bold', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
});

const styles = tailwindCVA('w-full justify-between font-medium text-black');

const generateId = () => `Select__${uuidv4()}`;

export default function Select(props: PropsWithChildren<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const trimmedLabel = props.label?.trim();
  const idRef = useRef(props.id || (trimmedLabel ? generateId() : undefined));
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`flex min-w-fit flex-col ${props.containerClass || ''}`}>
      {trimmedLabel && (
        <label className={labelStyles({ size: props.size })} htmlFor={idRef.current}>
          {trimmedLabel}
        </label>
      )}

      <div>
        <Button
          id={idRef.current}
          ref={triggerRef}
          intent='tertiary'
          outlined
          rounded={props.rounded}
          size={props.size}
          text={props.selectedOption || props.placeholder || 'Select'}
          icon={{
            svg: props.icon?.svg || (isDropdownOpen ? ArrowDropUpIcon : ArrowDropDownIcon),
            placement: 'right',
            styles: props.icon?.styles,
          }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles({ className: props.className })}
          disabled={props.disabled}
        />
        {props.children && (
          <>
            {React.cloneElement(props.children as JSX.Element, {
              isOpen: isDropdownOpen,
              triggerRef,
              size: props.size,
              closeMenu: () => setIsDropdownOpen(false),
            })}
          </>
        )}
      </div>
    </div>
  );
}

export type { Props as SelectProps };
