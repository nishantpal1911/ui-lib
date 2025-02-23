import { OverlayScrollbars, type PartialOptions } from 'overlayscrollbars';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { CSSProperties, PropsWithChildren, useRef } from 'react';

interface Props {
  styles?: CSSProperties;
  options?: PartialOptions;
}

export default function OverlayScroll(props: PropsWithChildren<Props>) {
  const osInstanceRef = useRef<OverlayScrollbars | null>(null);

  const handleScroll = () => {
    window.dispatchEvent(new Event('overlay-scroll'));
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
      style={props.styles}
    >
      {props.children}
    </OverlayScrollbarsComponent>
  );
}
