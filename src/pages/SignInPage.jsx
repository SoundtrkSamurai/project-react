import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignInForm from '@/components/SignInForm';
import { useAuth } from '@/context/AuthProvider';

const SignInPage = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && user) {
      navigate('/', { replace: true });
    }
  }, [navigate, token, user]);

  return (
    <div className='container flex items-center justify-center h-screen py-4'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;