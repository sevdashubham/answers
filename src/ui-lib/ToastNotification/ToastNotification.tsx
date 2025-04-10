import { useState } from 'react';
import { Toast, removeToast } from '@/atoms/toastAtoms';
import { useAtom } from 'jotai';
import { toastsAtom } from '@/atoms/toastAtoms';

interface ToastProps {
    toast: Toast;
}

const ToastNotification = ({ toast }: ToastProps) => {
    const [, setToasts] = useAtom(toastsAtom);
    const [isVisible, setIsVisible] = useState(true);

    // Handle close toast
    const handleClose = () => {
        setIsVisible(false);
        // Add a small delay for the exit animation
        setTimeout(() => {
            removeToast(toast.id)(setToasts);
        }, 300);
    };

    const getBgColor = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-900/50 border-green-700';
            case 'error':
                return 'bg-red-900/50 border-red-700';
            case 'info':
                return 'bg-blue-900/50 border-blue-700';
            default:
                return 'bg-gray-900/50 border-gray-700';
        }
    };

    const getTextColor = () => {
        switch (toast.type) {
            case 'success':
                return 'text-green-200';
            case 'error':
                return 'text-red-200';
            case 'info':
                return 'text-blue-200';
            default:
                return 'text-gray-200';
        }
    };

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                );
            case 'error':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                );
            case 'info':
                return (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div
            className={`fixed z-50 flex items-center border rounded-md p-4 shadow-lg transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
            } ${getBgColor()} ${getTextColor()}`}
            role="alert"
            style={{ top: '24px', right: '24px' }}
        >
            <div className="flex items-center">
                <div className="flex-shrink-0 mr-3">
                    {getIcon()}
                </div>
                <div className="text-sm font-medium">{toast.message}</div>
            </div>
            <button
                onClick={handleClose}
                className="ml-4 flex-shrink-0 text-gray-400 hover:text-white focus:outline-none"
            >
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ToastNotification;
