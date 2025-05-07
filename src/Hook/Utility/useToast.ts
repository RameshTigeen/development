import {useAppContext} from '../../Contexts/AppContext';

import type {AddNewToastProps, ShowToastProps, ToastVariant} from '../../types/Hook/useToast';

export default function useToast() {
  const {setToast} = useAppContext();

  const AddNewToast = ({id, message, time, variant, title, timestamp}: AddNewToastProps) => {
    setToast(prev => {
      const previousToast = prev?.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

      return [
        {
          variant,
          id,
          message,
          title,
          timestamp,
          onPress: () => {
            RemoveToast(id);
          },
        },
        ...previousToast,
      ]?.slice(0, 3);
    });
    setTimeout(() => {
      RemoveToast(id);
    }, time);
  };

  const RemoveToast = (id: string) => {
    setToast(prev => prev.filter(item => item.id !== id));
  };

  const ShowToast = ({message, variant, title = '', time}: ShowToastProps) => {
    /**
     * We Increase the toast timer for the Danger alert as per `GP` Request
     */

    // const toastTimer = time ?? (variant == 'Danger' ? 5000 : 4000);
    const toastTimer = time ?? 5000;
    const timestamp = new Date().getMilliseconds();
    const newToastId = String(Math.floor(100000 + Math.random() * timestamp));
    AddNewToast({
      id: newToastId,
      message,
      time: toastTimer,
      variant: variant || ('Info' as ToastVariant),
      title,
      timestamp,
    });
  };

  return {ShowToast};
}
