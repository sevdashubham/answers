//src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, authLoadingAtom } from '@/atoms/authAtoms';

const ProtectedRoute = () => {
    const [user] = useAtom(userAtom);
    const [loading] = useAtom(authLoadingAtom);

    if (loading) {
        return (
            <div className="flex flex-col w-full bg-[#1E1E1E] min-h-screen items-center justify-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9FF3B] mb-4"></div>
                <p>Loading authentication...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
