import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;