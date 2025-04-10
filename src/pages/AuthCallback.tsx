import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabaseBrowserClient } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const supabase = getSupabaseBrowserClient();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.search
      );

      if (error) {
        console.error('Error exchanging code for session:', error);
        navigate('/', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
      <div className="flex flex-col w-full bg-[#1E1E1E] min-h-screen items-center justify-center text-white">
        <p>Processing authentication...</p>
      </div>
  );
};

export default AuthCallback;
