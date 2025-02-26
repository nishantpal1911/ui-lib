import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';

import { ToastComponent } from 'src/components/ui/Toast';
import { ToastContext } from 'src/context/Toast';
import { useOutlet } from 'src/hooks';
import { Toast, ToastOptions } from 'src/types/toast';

interface ToastProviderProps {
  timeoutInMS?: number;
  className?: string;
}

const DEFAULT_TOAST_TIMEOUT = 10000;

export const ToastProvider = (props: PropsWithChildren<ToastProviderProps>) => {
  const toastOutlet = useOutlet('TOAST');
  const { addToast, pauseToast, removeToast, resumeToast, toasts } = useToastManager(props.timeoutInMS);

  const contextValue = useMemo(() => ({ add: addToast, dismiss: removeToast }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {toastOutlet &&
        ReactDOM.createPortal(
          <div className='fixed right-6 bottom-6 z-[9999] flex flex-col gap-2'>
            {toasts.map((toast) => (
              <ToastComponent
                key={toast.id}
                toast={toast}
                className={props.className}
                onPauseToast={pauseToast}
                onRemoveToast={removeToast}
                onResumeToast={resumeToast}
              />
            ))}
          </div>,
          toastOutlet
        )}
      {props.children}
    </ToastContext.Provider>
  );
};

const useToastManager = (timeoutInMS = DEFAULT_TOAST_TIMEOUT) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (newToast: ToastOptions, customTimeoutInMS?: number) => {
      const id = uuidv4();
      const remainingTime = customTimeoutInMS ?? timeoutInMS;
      const timeout = [Infinity, 0].includes(remainingTime) ? null : setTimeout(() => removeToast(id), remainingTime);
      const playedAt = new Date().getTime();
      // Store id, timeout, playedAt, and remainingTime in toast
      setToasts((prevToasts) => [...prevToasts, { ...newToast, id, timeout, playedAt, remainingTime }]);

      return id;
    },
    [removeToast, timeoutInMS]
  );

  const pauseToast = useCallback((currentToast: Toast) => {
    if (!currentToast.timeout) return;

    const pausedAt = new Date().getTime();
    // Elapsed time since last played will be current time - last recorded playedAt
    const elapsedTime = pausedAt - currentToast.playedAt;
    // New remaining time will be previously recorded remainingTime - elapsed time
    const remainingTime = currentToast.remainingTime - elapsedTime;

    // Store pausedAt and remainingTime values
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === currentToast.id ? { ...toast, pausedAt, remainingTime } : toast))
    );
    // Clear the timeout object stored in toast
    clearTimeout(currentToast.timeout);
  }, []);

  const resumeToast = useCallback(
    (currentToast: Toast) => {
      if ([Infinity, 0].includes(currentToast.remainingTime)) return;

      const playedAt = new Date().getTime();
      // Add a timeout to remove the toast after the `remainingTime` on toast
      const timeout = setTimeout(() => removeToast(currentToast.id), currentToast.remainingTime);

      // Store the `playedAt` as current time, timeout object, and remove `pausedAt`
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === currentToast.id ? { ...toast, timeout, playedAt, pausedAt: null } : toast
        )
      );
    },
    [removeToast]
  );

  return { toasts, addToast, pauseToast, removeToast, resumeToast };
};
