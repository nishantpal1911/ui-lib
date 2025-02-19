import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import { Button, OverlayScroll } from 'src/components/ui';

export interface ModalProps {
  isOpen: boolean;
  header?: string;
  className?: string;
  onDismiss: () => void;
}

const modalStyles = cva(
  'fixed top-1/3 left-2/4 h-auto max-h-[90lvh] max-w-[90lvw] min-w-72 -translate-x-2/4 -translate-y-1/3 rounded-xl border-2 border-gray-300 bg-white px-6 py-4'
);

export default function Modal(props: PropsWithChildren<ModalProps>) {
  return ReactDOM.createPortal(
    <Fade in={props.isOpen} mountOnEnter unmountOnExit>
      <div>
        <div className='fixed top-0 left-0 h-full w-full bg-black/60 p-4' />

        <OverlayScroll className={modalStyles({ className: props.className })}>
          <div className='flex items-center justify-between gap-4 pb-4'>
            {props.header && <h4 className='cursor-default font-bold text-gray-800'>{props.header}</h4>}
            <Button
              size='lg'
              intent='tertiary'
              icon={{ svg: CloseIcon, styles: { color: 'action' } }}
              className='p-3!'
              rounded
              onClick={props.onDismiss}
            />
          </div>
          <div>{props.children}</div>
        </OverlayScroll>
      </div>
    </Fade>,
    document.getElementById('modal-outlet') as HTMLElement
  );
}
