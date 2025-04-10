import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

interface ErrorBoundaryProps {
    children?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Function to render error UI - used by both class and function components
function ErrorUI({ error }: { error: Error | string }) {
    const errorMessage = typeof error === 'string' ? error : error.message || 'An unknown error occurred';

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1E1E1E] p-6">
            <div className="max-w-md w-full bg-[#2A2A2A] p-6 rounded-lg border border-red-500 shadow-lg">
                <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
                <div className="bg-[#333] p-3 rounded overflow-auto max-h-64 mb-4">
                    <code className="text-white">{errorMessage}</code>
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444] transition-colors"
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}

// This function component is for use as errorElement in React Router v6
export function ErrorBoundaryRouteAdapter() {
    const error = useRouteError();
    let errorMessage: string;

    if (isRouteErrorResponse(error)) {
        errorMessage = `${error.status} ${error.statusText}: ${error.data}`;
    } else if (error instanceof Error) {
        errorMessage = error.message;
    } else if (typeof error === 'string') {
        errorMessage = error;
    } else {
        errorMessage = 'Unknown error occurred';
    }

    return <ErrorUI error={errorMessage} />;
}

// Class component for traditional React error boundary usage
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    override componentDidMount(): void {
        window.addEventListener('error', this.handleGlobalError);

        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

            if (!supabaseUrl || supabaseUrl === 'your-supabase-url') {
                throw new Error('VITE_SUPABASE_URL is not configured properly in .env file');
            }

            if (!supabaseKey || supabaseKey === 'your-supabase-anon-key') {
                throw new Error('VITE_SUPABASE_ANON_KEY is not configured properly in .env file');
            }
        } catch (error) {
            this.setState({
                hasError: true,
                error: error instanceof Error ? error : new Error(String(error)),
            });
        }
    }

    override componentWillUnmount(): void {
        window.removeEventListener('error', this.handleGlobalError);
    }

    handleGlobalError = (event: ErrorEvent): void => {
        if (
            event.error &&
            (event.error.message.includes('URL') ||
                event.error.message.includes('Supabase') ||
                event.error.message.includes('env'))
        ) {
            this.setState({
                hasError: true,
                error: event.error,
            });
            event.preventDefault();
        }
    };

    override render(): ReactNode {
        if (this.state.hasError) {
            return <ErrorUI error={this.state.error || 'Unknown error'} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
