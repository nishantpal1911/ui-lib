import { cx } from 'class-variance-authority';
import { OverlayScrollbars, type PartialOptions } from 'overlayscrollbars';
import 'overlayscrollbars/styles/overlayscrollbars.css';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { CSSProperties, PropsWithChildren, useRef } from 'react';

interface Props {
  style?: CSSProperties;
  options?: PartialOptions;
  className?: string;
}

export default function OverlayScroll(props: PropsWithChildren<Props>) {
  const osInstanceRef = useRef<OverlayScrollbars | null>(null);

  const handleScroll = () => {
    window.dispatchEvent(new Event('scroll'));
  };

  return (
    <OverlayScrollbarsComponent
      ref={(osComponent) => {
        osInstanceRef.current = osComponent?.osInstance() || null;
      }}
      options={{
        scrollbars: {
          autoHide: 'move',
          autoHideDelay: 250,
        },
        ...(props.options || {}),
      }}
      events={{ scroll: handleScroll }}
      style={props.style}
      className={cx('overscroll-contain', props.className)}
    >
      {props.children}
    </OverlayScrollbarsComponent>
  );
}

export type { Props as OverlayScrollProps };
