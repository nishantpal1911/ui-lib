import { cva } from 'class-variance-authority';
import { memo, useEffect } from 'react';

import { Toast } from 'src/types/toast';

interface Props {
  toast: Toast;
}

const styles = cva('absolute bottom-0 h-1 w-full rounded-br-md rounded-bl-md', {
  variants: {
    type: {
      success: 'bg-success',
      error: 'bg-danger',
      warn: 'bg-warning',
      info: 'bg-blue-300',
    },
  },
  defaultVariants: {
    type: 'info',
  },
});

const ProgressBar = memo(function ProgressBar({ toast }: Props) {
  useEffect(() => {
    const element = document.getElementById(toast.id);
    if (!element) return;

    if (toast.pausedAt) {
      // Get current dynamic width
      const computedStyle = window.getComputedStyle(element);
      const remainingWidth = computedStyle.getPropertyValue('width');
      // Remove transition
      element.style.transition = '';
      // Set static width to current computed width
      element.style.width = remainingWidth;
    } else {
      // Set transition with remaining time on toast
      element.style.transition = `width ${toast.remainingTime}ms linear`;
      // Let width transition towards 0
      const timeout = setTimeout(() => {
        element.style.width = '0';
      }, 0);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [toast.id, toast.pausedAt, toast.remainingTime]);

  return <div id={toast.id} className={styles({ type: toast.type })} />;
});

export default ProgressBar;
