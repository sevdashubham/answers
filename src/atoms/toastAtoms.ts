//src/atoms/toastAtoms.ts
import { atom } from 'jotai';

export type ToastType = 'success' | 'error' | 'info';

export type Toast = {
    id: string;
    message: string;
    type: ToastType;
    duration: number;
};

// Atom to store all toast notifications
export const toastsAtom = atom<Toast[]>([]);

// Actions for managing toasts
export const addToast = (toast: Omit<Toast, 'id'>) => {
    return (set: (update: (prev: Toast[]) => Toast[]) => void) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((prev) => [...prev, { ...toast, id }]);

        // Remove toast after duration
        setTimeout(() => {
            removeToast(id)(set);
        }, toast.duration);
    };
};

export const removeToast = (id: string) => {
    return (set: (update: (prev: Toast[]) => Toast[]) => void) => {
        set((prev) => prev.filter((toast) => toast.id !== id));
    };
};

// Helper function to show a toast message
export const showToast = (
    message: string,
    type: ToastType = 'info',
    duration: number = 5000
) => {
    return (set: (update: (prev: Toast[]) => Toast[]) => void) => {
        addToast({ message, type, duration })(set);
    };
};
