import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import AuthCallback from '@/pages/AuthCallback';
import ProtectedRoute from './ProtectedRoute';
import { ErrorBoundaryRouteAdapter } from '@/components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorBoundaryRouteAdapter />,
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
    errorElement: <ErrorBoundaryRouteAdapter />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundaryRouteAdapter />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
