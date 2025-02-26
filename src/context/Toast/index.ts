import { createContext } from 'react';

import { ToastOptions } from 'src/types/toast';

interface IToastContext {
  add: (options: ToastOptions, timeout?: number) => string;
  dismiss: (toastId: string) => void;
}

export const ToastContext = createContext<IToastContext>({
  add: () => '',
  dismiss: () => {},
});

export * from 'src/context/Toast/Provider';
