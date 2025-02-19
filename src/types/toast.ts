export enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}

export interface ToastOptions {
  message: string;
  type?: ToastType;
}

export interface Toast extends ToastOptions {
  id: string;
  timeout: NodeJS.Timeout;
  playedAt: number;
  remainingTime: number;
  pausedAt?: number | null;
}
