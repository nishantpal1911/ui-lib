import Collapse, { CollapseProps } from '@mui/material/Collapse';
import { cva, VariantProps } from 'class-variance-authority';
import React, { Children, CSSProperties, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { twMerge } from 'tailwind-merge';

import { OverlayScroll } from 'src/components/ui';
import type { ButtonSize } from 'src/components/ui/Button';
import { useOutlet } from 'src/hooks';

interface Props extends VariantProps<typeof containerStyles> {
  className?: string;
  eagerLoad?: boolean;
  transition?: CollapseProps | boolean;
  isOpen?: boolean;
  showBgOnSelected?: boolean;
  collapseOnSelect?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
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

const portalRootStyles = cva('absolute rounded-lg bg-white shadow-xl', {
  variants: {
    isHidden: {
      true: 'hidden',
    },
  },
});

const PortalRootElement = React.memo(function ({
  children,
  containerRef,
  eagerLoad,
  isOpen,
  transition,
}: PropsWithChildren<{
  transition?: CollapseProps | boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isOpen?: boolean;
  eagerLoad?: boolean;
}>) {
  const getSizeAndPositionStyles = (divElement: HTMLDivElement | null): CSSProperties => {
    if (!divElement) return {};

    const { width, x, y } = divElement.getBoundingClientRect();

    return { top: y + 1, left: x, minWidth: width };
  };

  const commonProps = {
    className: portalRootStyles({ isHidden: !transition && !isOpen }),
    style: getSizeAndPositionStyles(containerRef.current),
  };
  const transitionProps = {
    in: isOpen,
    mountOnEnter: !eagerLoad,
    unmountOnExit: !eagerLoad,
    timeout: { enter: 150, exit: 0 },
    easing: 'ease-out',
    ...(typeof transition === 'object' && transition),
  };

  return transition ?
      <Collapse {...commonProps} {...transitionProps}>
        {children}
      </Collapse>
    : (eagerLoad || isOpen) && <div {...commonProps}>{children}</div>;
});

export default function Dropdown({
  collapseOnSelect = true,
  passInternalProp = true,
  transition = false,
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
          props.closeMenu?.();
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
          <PortalRootElement transition={transition} containerRef={containerRef} isOpen={props.isOpen}>
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
          </PortalRootElement>,
          dropdownOutlet
        )}
    </div>
  );
}

export type { Props as DropdownProps };
