import Collapse from '@mui/material/Collapse';
import { cva, VariantProps } from 'class-variance-authority';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import React, { Children, CSSProperties, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { twMerge } from 'tailwind-merge';

import { ButtonSize, OverlayScroll } from 'src/components/ui';
import { useOutlet } from 'src/hooks';

interface Props extends VariantProps<typeof containerStyles> {
  className?: string;
  isOpen?: boolean;
  showBgOnSelected?: boolean;
  collapseOnSelect?: boolean;
  eagerLoad?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  closeMenu?: () => void;
  onSelect?: (value?: string) => void;
  passInternalProp?: boolean;
  // Passes to children
  size?: ButtonSize;
}

const containerStyles = cva('relative z-10 flex h-0', {
  variants: {
    // TODO: Add support for this
    position: {
      left: '',
      right: 'justify-end',
      center: 'justify-center',
    },
  },
  defaultVariants: {
    position: 'left',
  },
});

const dropdownStyles = (className?: string) => twMerge('flex min-w-max flex-col py-2', className);

export default function Dropdown({
  collapseOnSelect = true,
  eagerLoad = false,
  passInternalProp = true,
  ...props
}: PropsWithChildren<Props>) {
  const dropdownOutlet = useOutlet('DROPDOWN');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      props.closeMenu?.();
    };

    // Listen to custom scroll event
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSizeAndPositionStyles = (divElement: HTMLDivElement | null): CSSProperties => {
    if (!divElement) return {};

    const { width, x, y } = divElement.getBoundingClientRect();

    return { top: y + 1, left: x, minWidth: width };
  };

  const onOutsideClick = ({ target }: MouseEvent) => {
    const { current: triggerBtn } = props.triggerRef || {};
    if (!props.isOpen || !triggerBtn || triggerBtn.contains(target as Node)) return;

    props.closeMenu?.();
  };

  const childProps = {
    ...(passInternalProp && {
      onSelectInternal: (value?: string) => {
        props.onSelect?.(value);
        if (collapseOnSelect) {
          setTimeout(() => props.closeMenu?.(), 100);
        }
      },
      size: props.size,
    }),
    ...(props.showBgOnSelected && { showBgOnSelected: props.showBgOnSelected }),
  };

  return (
    <div ref={containerRef} className={containerStyles({ position: props.position })}>
      {dropdownOutlet &&
        ReactDOM.createPortal(
          <Collapse
            className='absolute rounded-lg bg-white shadow-xl'
            style={getSizeAndPositionStyles(containerRef.current)}
            in={props.isOpen}
            mountOnEnter={!eagerLoad}
            unmountOnExit={!eagerLoad}
            timeout={{ enter: 150, exit: 100 }}
            easing='ease-out'
          >
            <OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!props.isOpen}>
              <OverlayScroll>
                {props.children && (
                  <div className={dropdownStyles(props.className)}>
                    {Children.map(props.children, (child, index) =>
                      React.isValidElement(child) ? React.cloneElement(child, { key: index, ...childProps }) : child
                    )}
                  </div>
                )}
              </OverlayScroll>
            </OutsideClickHandler>
          </Collapse>,
          dropdownOutlet
        )}
    </div>
  );
}
