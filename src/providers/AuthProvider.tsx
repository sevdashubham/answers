import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { userAtom, sessionAtom, authLoadingAtom, initAuth } from '@/atoms/authAtoms';

type AuthProviderProps = {
    children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const setUser = useSetAtom(userAtom);
    const setSession = useSetAtom(sessionAtom);
    const setLoading = useSetAtom(authLoadingAtom);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        const initializeAuth = async () => {
            unsubscribe = await initAuth(setUser, setSession, setLoading);
        };

        initializeAuth();

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [setUser, setSession, setLoading]);

    return <>{children}</>;
};

export default AuthProvider;
