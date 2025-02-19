import Collapse from '@mui/material/Collapse';
import { cva, VariantProps } from 'class-variance-authority';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import React, { Children, CSSProperties, PropsWithChildren, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import OverlayScroll from 'src/components/ui/OverlayScroll';

interface Props extends VariantProps<typeof containerStyles> {
  className?: string;
  isOpen?: boolean;
  passInternalProp?: boolean;
  showBgOnSelected?: boolean;
  eagerLoad?: boolean;
  collapseOnSelect?: boolean;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  closeMenu?: () => void;
  onSelect?: (value?: string) => void;
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

export default function Dropdown({
  collapseOnSelect = true,
  eagerLoad = false,
  passInternalProp = true,
  ...props
}: PropsWithChildren<Props>) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      props.closeMenu?.();
    };

    // Listen to custom scroll event
    window.addEventListener('overlay-scroll', handleScroll);

    return () => {
      window.removeEventListener('overlay-scroll', handleScroll);
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
          props.closeMenu?.();
        }
      },
    }),
    ...(props.showBgOnSelected && { showBgOnSelected: props.showBgOnSelected }),
  };

  return (
    <div ref={containerRef} className={containerStyles({ position: props.position })}>
      {ReactDOM.createPortal(
        <Collapse
          className='absolute rounded-lg bg-white shadow-xl'
          style={getSizeAndPositionStyles(containerRef.current)}
          in={props.isOpen}
          mountOnEnter={!eagerLoad}
          unmountOnExit={!eagerLoad}
        >
          <OutsideClickHandler onOutsideClick={onOutsideClick} disabled={!props.isOpen}>
            <OverlayScroll className={`flex flex-col py-2 font-semibold ${props.className || ''}`}>
              {props.children &&
                Children.map(props.children, (child, index) =>
                  React.isValidElement(child) ? React.cloneElement(child, { key: index, ...childProps }) : child
                )}
            </OverlayScroll>
          </OutsideClickHandler>
        </Collapse>,
        document.getElementById('dropdown-outlet') as HTMLElement
      )}
    </div>
  );
}
