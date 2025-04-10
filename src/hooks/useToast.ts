import { useAtom } from 'jotai';
import { toastsAtom, ToastType, showToast as showToastAction } from '@/atoms/toastAtoms';

export const useToast = () => {
    const [, setToasts] = useAtom(toastsAtom);

    const showToast = (message: string, type: ToastType = 'info', duration: number = 5000) => {
        showToastAction(message, type, duration)(setToasts);
    };

    return { showToast };
};

export default useToast;
