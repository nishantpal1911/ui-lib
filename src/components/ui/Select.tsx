import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { cva, VariantProps } from 'class-variance-authority';
import React, { JSX, PropsWithChildren, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'src/components/ui';

interface Props extends VariantProps<typeof styles> {
  id?: string;
  label?: string;
  className?: string;
  containerClass?: string;
  selectedOption?: string;
  placeholder?: string;
  disabled?: boolean;
  icon?: {
    svg: typeof SvgIcon;
    styles?: SvgIconProps;
  };
}

const styles = cva('w-full justify-between font-medium has-[span]:text-black hover:has-[span]:text-black', {
  variants: {
    size: {
      xs: 'pl-3',
      sm: 'pr-2 pl-4',
      md: 'pl-4',
      lg: 'pr-3 pl-5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const generateId = () => `Select__${uuidv4()}`;

export default function Select(props: PropsWithChildren<Props>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const idRef = useRef(props.id || (props.label ? generateId() : undefined));
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={`flex min-w-fit flex-col ${props.containerClass || ''}`}>
      {props.label && (
        <label className='pointer-events-none mb-2 inline-block font-bold' htmlFor={idRef.current}>
          {props.label}
        </label>
      )}

      <div className={props.className}>
        <Button
          id={idRef.current}
          buttonRef={triggerRef}
          intent='tertiary'
          outlined
          size={props.size}
          text={props.selectedOption || props.placeholder || 'Select'}
          icon={{
            svg: props.icon?.svg || (isDropdownOpen ? ArrowDropUpIcon : ArrowDropDownIcon),
            placement: 'right',
            styles: { ...(props.icon?.styles || {}), fontSize: props.size === 'lg' ? 'large' : 'medium' },
          }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={styles({ size: props.size })}
          disabled={props.disabled}
        />
        {props.children && (
          <>
            {React.cloneElement(props.children as JSX.Element, {
              isOpen: isDropdownOpen,
              triggerRef,
              closeMenu: () => setIsDropdownOpen(false),
            })}
          </>
        )}
      </div>
    </div>
  );
}
