import React from 'react';
import Routes from './routes';
import AuthProvider from './providers/AuthProvider';
import ToastProvider from './providers/ToastProvider';

function App() {
    return (
        <div>
            <AuthProvider>
                <ToastProvider>
                    <Routes/>
                </ToastProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
