import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import { cx } from 'class-variance-authority';
import { memo, useEffect, useState } from 'react';

import { Button } from 'src/components/ui';
import { ProgressBar } from 'src/components/ui/Toast';
import css from 'src/styles/ui/Toast.module.css';
import { Toast as IToast, ToastType } from 'src/types/toast';
import { tailwindCVA } from 'src/utils/cva';

interface Props {
  toast: IToast;
  className?: string;
  onPauseToast: (toast: IToast) => void;
  onResumeToast: (toast: IToast) => void;
  onRemoveToast: (id: string) => void;
}

const styles = tailwindCVA(
  `${css.transition} relative h-fit w-96 rounded-md bg-white opacity-0 shadow-xl drop-shadow-md`,
  {
    variants: {
      isVisible: {
        true: 'opacity-100',
      },
    },
  }
);

const ToastIcon = ({ type }: { type?: ToastType }) => {
  switch (type) {
    case ToastType.SUCCESS:
      return <CheckCircleOutlineOutlinedIcon className='text-success' />;
    case ToastType.ERROR:
      return <ReportGmailerrorredOutlinedIcon className='text-danger' />;
    case ToastType.WARN:
      return <WarningAmberOutlinedIcon className='text-warning' />;
  }

  return <InfoOutlinedIcon className='text-blue-300' />;
};

const Toast = memo(function Toast(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  // TODO: Move to React Transitions
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      key={props.toast.id}
      className={styles({ isVisible, className: cx(props.className, props.toast.className) })}
      onMouseEnter={() => props.onPauseToast(props.toast)}
      onMouseLeave={() => props.onResumeToast(props.toast)}
    >
      <div className='flex items-center gap-1 p-4 pr-1'>
        <ToastIcon type={props.toast.type} />
        <span className='ml-1 py-2'>{props.toast.message}</span>
        <Button
          intent='tertiary'
          size='sm'
          rounded
          icon={{ svg: CloseIcon }}
          onClick={() => props.onRemoveToast(props.toast.id)}
          className='ml-auto self-start py-2.5'
        />
      </div>
      <ProgressBar toast={props.toast} />
    </div>
  );
});

export default Toast;
