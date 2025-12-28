import Collapse, { CollapseProps } from '@mui/material/Collapse';
import { cva, VariantProps } from 'class-variance-authority';
import React, { CSSProperties, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { twMerge } from 'tailwind-merge';

import { OverlayScroll } from 'src/components/ui';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';
import { useOutlet } from 'src/hooks';

interface Props extends VariantProps<typeof containerStyles> {
  className?: string;
  eagerLoad?: boolean;
  transition?: CollapseProps | boolean;
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

export default function MenuContainer({ transition = false, ...props }: PropsWithChildren<Props>) {
  const { isMenuOpen, setIsMenuOpen, triggerRef } = useMenuContext();
  const menuOutlet = useOutlet('DROPDOWN');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    // Listen to custom scroll event
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsMenuOpen]);

  const onOutsideClick = ({ target }: MouseEvent) => {
    const { current: triggerBtn } = triggerRef || {};
    if (!isMenuOpen || !triggerBtn || triggerBtn.contains(target as Node)) return;

    setIsMenuOpen(false);
  };

  return (
    <div ref={containerRef} className={containerStyles({ position: props.position })}>
      {menuOutlet &&
        ReactDOM.createPortal(
          <PortalRootElement
            transition={transition}
            containerRef={containerRef}
            isOpen={isMenuOpen}
            eagerLoad={props.eagerLoad}
          >
            <OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!isMenuOpen}>
              <OverlayScroll>
                {props.children && <div className={dropdownStyles(props.className)}>{props.children}</div>}
              </OverlayScroll>
            </OutsideClickHandler>
          </PortalRootElement>,
          menuOutlet
        )}
    </div>
  );
}

export type { Props as MenuContainerProps };
