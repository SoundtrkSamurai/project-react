import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import { useAuth } from '@/context/AuthProvider';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

import useSignInMutation from '@/hooks/mutations/useSignInMutation';

import Form from './Form';
import TextInput from './TextInput';

const SignInForm = () => {
  const { setToken, setUser } = useAuth();

  const form = useForm({
    resolver: zodResolver(signInFormSchema),
  });

  const signInMutation = useSignInMutation();

  const onSubmit = async (data) => {
    try {
      const { data } = await signInMutation.mutateAsync(data);
      setToken(data.accessToken);
      setUser(data.user);
    } catch (e) {
      form.setError('root', {
        message: e.response.data.message,
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
        <Form form={form}>
          <TextInput
            control={form.control}
            name='email'
            placeholder='name@example'
            type='email'
          />
          <TextInput control={form.control} name='password' type='password' />
          <Button
            disabled={signInMutation.isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {signInMutation.isPending ? 'Loading...' : 'Sign In'}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
