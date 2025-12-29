import Fade, { FadeProps } from '@mui/material/Fade';
import { cva } from 'class-variance-authority';
import React, { ComponentProps, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { twMerge } from 'tailwind-merge';

import { OverlayScroll } from 'src/components/ui';
import { useMenuContext } from 'src/components/ui/Menu/MenuContext';
import { useOutlet } from 'src/hooks';

interface Props extends ComponentProps<'div'> {
  className?: string;
  eagerLoad?: boolean;
  transition?: FadeProps | boolean;
}

const dropdownStyles = (className?: string) => twMerge('py-2', className);

const portalRootStyles = cva('rounded-lg bg-white shadow-xl', {
  variants: {
    isHidden: {
      true: 'hidden',
    },
  },
});

const PortalRootElement = React.memo(function ({
  children,
  eagerLoad,
  transition,
}: PropsWithChildren<{
  transition?: FadeProps | boolean;
  eagerLoad?: boolean;
}>) {
  const { floatingStyles, isMenuOpen, refs } = useMenuContext();
  const commonProps = {
    ref: refs?.setFloating,
    style: { ...floatingStyles, minWidth: refs?.reference.current?.getBoundingClientRect().width },
    className: portalRootStyles({ isHidden: !transition && !isMenuOpen }),
  };
  const transitionProps = {
    in: isMenuOpen,
    mountOnEnter: !eagerLoad,
    unmountOnExit: !eagerLoad,
    timeout: { enter: 100, exit: 50 },
    easing: 'ease-out',
    ...(typeof transition === 'object' && transition),
  };

  return transition ?
      <Fade {...commonProps} {...transitionProps}>
        <div>{children}</div>
      </Fade>
    : (eagerLoad || isMenuOpen) && <div {...commonProps}>{children}</div>;
});

export default function MenuContainer({
  children,
  className,
  eagerLoad = false,
  transition = false,
  ...restProps
}: PropsWithChildren<Props>) {
  const menuOutlet = useOutlet('DROPDOWN');
  const { isMenuOpen, maxHeight, refs, setIsMenuOpen } = useMenuContext();

  const onOutsideClick = ({ target }: MouseEvent) => {
    const { current: triggerBtn } = refs?.reference || {};
    if (!isMenuOpen || !triggerBtn || (triggerBtn as HTMLElement).contains(target as Node)) return;
    setIsMenuOpen(false);
  };

  return (
    menuOutlet &&
    ReactDOM.createPortal(
      <PortalRootElement transition={transition} eagerLoad={eagerLoad}>
        <OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!isMenuOpen}>
          <OverlayScroll style={{ maxHeight: maxHeight && `${maxHeight}px` }}>
            {children && (
              <div className={dropdownStyles(className)} {...restProps}>
                {children}
              </div>
            )}
          </OverlayScroll>
        </OutsideClickHandler>
      </PortalRootElement>,
      menuOutlet
    )
  );
}

export type { Props as MenuContainerProps };
