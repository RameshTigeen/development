export type AddNewToastProps = {
  id: string;
  message: string;
  time: number;
  variant: ToastVariant;
  title: string;
  timestamp: number;
};

export type ShowToastProps = {
  message: string;
  variant?: ToastVariant;
  title?: string;
  time?: number;
};

export type ToastVariant = 'Success' | 'Warning' | 'Info' | 'Danger';

export interface ToastStateTypes {
  id: string;
  message: string;
  onPress: (id: string) => void;
  title: string;
  variant: ToastVariant;
  timestamp: number;
}
