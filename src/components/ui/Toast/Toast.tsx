import CloseIcon from '@mui/icons-material/Close';
import { cva } from 'class-variance-authority';
import { memo, useEffect, useState } from 'react';

import { Button } from 'src/components/ui';
import { ProgressBar } from 'src/components/ui/Toast';
import css from 'src/styles/ui/Toast.module.css';
import { Toast as IToast } from 'src/types/toast';

interface Props {
  toast: IToast;
  onPauseToast: (toast: IToast) => void;
  onResumeToast: (toast: IToast) => void;
  onRemoveToast: (id: string) => void;
}

const styles = cva(`${css.transition} relative h-fit w-96 rounded-md bg-white opacity-0`, {
  variants: {
    isVisible: {
      true: 'opacity-100',
    },
  },
});

const Toast = memo(function Toast(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // TODO: Move to React Transitions
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      key={props.toast.id}
      className={styles({ isVisible })}
      onMouseEnter={() => props.onPauseToast(props.toast)}
      onMouseLeave={() => props.onResumeToast(props.toast)}
    >
      <div className='flex items-start justify-between gap-1 p-4 pr-1'>
        <span className='py-2'>{props.toast.message}</span>
        <Button
          intent='tertiary'
          size='sm'
          rounded
          icon={{ svg: CloseIcon }}
          onClick={() => props.onRemoveToast(props.toast.id)}
        />
      </div>
      <ProgressBar toast={props.toast} />
    </div>
  );
});

export default Toast;
