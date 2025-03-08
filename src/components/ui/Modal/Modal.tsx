import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { PropsWithChildren, useRef } from 'react';
import ReactDOM from 'react-dom';
import { twMerge } from 'tailwind-merge';

import { Button, OverlayScroll } from 'src/components/ui';
import { useOutlet } from 'src/hooks';

interface ModalProps {
  isOpen: boolean;
  header?: string;
  className?: string;
  onDismiss: () => void;
}

const modalBackdropClassName = 'fixed top-0 left-0 h-full w-full bg-black/60 p-4';

const modalStyles = (className?: string) =>
  twMerge(
    'fixed top-1/3 left-2/4 h-auto max-h-[90svh] max-w-3xl min-w-72 -translate-x-2/4 -translate-y-1/3 rounded-xl border-1 border-gray-500 bg-white px-6 py-4',
    className
  );

export default function Modal(props: PropsWithChildren<ModalProps>) {
  const modalOutlet = useOutlet('MODAL');
  const modalContentRef = useRef<HTMLDivElement>(null);

  const focusModal = () => {
    setTimeout(() => modalContentRef.current?.focus());
  };

  return (
    modalOutlet &&
    ReactDOM.createPortal(
      <Fade in={props.isOpen} mountOnEnter unmountOnExit onEnter={focusModal}>
        {/* Background Scrum */}
        <div className={modalBackdropClassName}>
          {/* Modal Content */}
          {/* TODO: Move scrollbar to apply on the content */}
          <OverlayScroll className={modalStyles(props.className)}>
            {/* Modal Header */}
            <div tabIndex={-1} ref={modalContentRef} className='flex items-center justify-between gap-4 pb-4'>
              {props.header && <h4 className='cursor-default font-bold text-gray-800'>{props.header}</h4>}
              <Button
                size='lg'
                intent='tertiary'
                icon={{ svg: CloseIcon, styles: { color: 'action' } }}
                className='p-3'
                rounded
                onClick={props.onDismiss}
              />
            </div>

            {/* Modal Body */}
            <div>{props.children}</div>
          </OverlayScroll>
        </div>
      </Fade>,
      modalOutlet
    )
  );
}

export type { ModalProps };
