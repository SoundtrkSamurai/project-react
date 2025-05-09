import { useController } from 'react-hook-form';

import { Input } from '@/components/ui/Input';

const TextInput = ({ control, name, type = 'text', ...rest }) => {
  const form = useController({ control, name });

  const error = form.formState.errors[name];

  return (
    <div>
      <Input
        {...rest}
        onBlur={form.field.onBlur}
        onChange={form.field.onChange}
        type={type}
        value={form.field.value || ''}
      />
      {error && (
        <div className='mt-2 text-sm text-red-500'>{error.message}</div>
      )}
    </div>
  );
};

export default TextInput;
