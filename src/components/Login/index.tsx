import {useState, useEffect} from 'react';
import {useAtom} from 'jotai';
import {Navigate} from 'react-router-dom';
import {
    userAtom,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    authLoadingAtom
} from '@/atoms/authAtoms';
import useToast from '@/hooks/useToast';

// Import subcomponents
import LoginForm from './LoginForm';
import GoogleSignInButton from './GoogleSignUpButton';
import AuthToggle from './AuthToggle';

// Import types
import {FormValues} from './types';

const Login = () => {
    const [user] = useAtom(userAtom);
    const [authLoading] = useAtom(authLoadingAtom);
    const {showToast} = useToast();
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handle auth state redirect more reliably
    useEffect(() => {
        if (user) {
            window.location.href = '/dashboard';
        }
    }, [user]);

    if (authLoading) {
        return <div className="h-[100vh] w-full flex justify-center items-center"><svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg></div>;
    }

    if (user) {
        return <Navigate to="/dashboard" replace/>;
    }

    // Handle form submission (sign in or sign up)
    const handleAuth = async (values: FormValues) => {
        setLoading(true);

        try {
            if (isSignUp) {
                const {error} = await signUpWithEmail(values.email, values.password);
                if (error) throw error;
                showToast('Check your email to confirm your account!', 'success');
            } else {
                const {error} = await signInWithEmail(values.email, values.password);
                if (error) throw error;
            }
        } catch (err) {
            showToast(
                err instanceof Error ? err.message : 'Authentication failed',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    // Handle Google sign-in
    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const {error} = await signInWithGoogle();
            if (error) throw error;
        } catch (err) {
            showToast(
                err instanceof Error ? err.message : 'Google authentication failed',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    // Toggle between sign in and sign up
    const toggleAuthMode = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="flex flex-col w-full bg-zinc-900 min-h-screen items-center justify-center text-white px-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        AnswersAi
                    </h1>
                    <h2 className="mt-6 text-xl">
                        {isSignUp ? 'Create a new account' : 'Sign in to your account'}
                    </h2>
                </div>

                <LoginForm
                    isSignUp={isSignUp}
                    loading={loading}
                    onSubmit={handleAuth}
                />

                <GoogleSignInButton
                    onClick={handleGoogleSignIn}
                />

                <AuthToggle isSignUp={isSignUp} onToggle={toggleAuthMode}/>
            </div>
        </div>
    );
};

export default Login;
