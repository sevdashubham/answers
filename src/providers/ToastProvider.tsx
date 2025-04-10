import { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { createPortal } from 'react-dom';
import { toastsAtom } from '@/atoms/toastAtoms';
import ToastNotification from '@/ui-lib/ToastNotification/ToastNotification';

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toasts] = useAtom(toastsAtom);

    // Create a portal container if it doesn't exist
    useEffect(() => {
        if (!document.getElementById('toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Cleanup on unmount
        return () => {
            const container = document.getElementById('toast-container');
            if (container) {
                document.body.removeChild(container);
            }
        };
    }, []);

    return (
        <>
            {children}
            {document.getElementById('toast-container') &&
                createPortal(
                    <div className="toast-wrapper" style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
                        {toasts.map((toast, index) => (
                            <div key={toast.id} style={{ marginBottom: index > 0 ? '16px' : 0 }}>
                                <ToastNotification toast={toast} />
                            </div>
                        ))}
                    </div>,
                    document.getElementById('toast-container')!
                )}
        </>
    );
};

export default ToastProvider;
