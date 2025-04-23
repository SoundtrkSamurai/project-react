import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';
import { useAuth } from '@/context/AuthProvider';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

import React from 'react';

const SignInForm = () => {
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/auth/signin', data);
      setToken(response.data.accessToken);
    } catch (error) {
      setError('root', {
        message: error.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-2xl text-center'>Sign In</h2>
        <p className='text-cetner text-muted-foreground'>
          Sign in using your email and password.
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>
          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>
          {errors['root'] && (
            <div className='mt-2 text-sm text-center text-red-500'>
              {errors['root'].message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
