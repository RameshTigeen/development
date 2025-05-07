export type AppIconName =
  | 'Close'
  | 'Plus'
  | 'ChevronLeft'
  | 'ChevronUp'
  | 'ChevronDown'
  | 'ChevronRight'
  | 'Check'
  | 'Logout'
  | 'Delete'
  | 'CloseArrow'
  | 'ToastSuccess'
  | 'ToastWarning'
  | 'ToastInfo'
  | 'ToastDanger'
  | 'Settings'
  | 'Eye'
  | 'ListView'
  | 'EyeSlash'
  | 'Clock'
  | 'InternetConnection';

export interface AppIconProps {
  name: AppIconName;
  size: number;
  color: string;
}
