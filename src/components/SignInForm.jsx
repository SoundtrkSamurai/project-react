import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

import React from 'react';

const SignInForm = () => {
  const {
    formState: { errors },
    register,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
  });

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

          <Button>Sign In</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
