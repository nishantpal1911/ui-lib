export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}

export interface ToastOptions {
  message: string;
  type?: ToastType;
  className?: string;
}

export interface Toast extends ToastOptions {
  id: string;
  timeout: NodeJS.Timeout | null;
  playedAt: number;
  remainingTime: number;
  pausedAt?: number | null;
}
