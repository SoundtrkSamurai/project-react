import { useController } from 'react-hook-form';

import { Stepper } from '@/components/ui';

const StepperInput = ({ control, name, label, ...rest }) => {
  const form = useController({ control, name });
  return (
    <div>
      <Stepper
        label={label}
        value={form.field.value || 0}
        onChange={form.field.onChange}
        {...rest}
      />
      {form.fieldState.error?.message && (
        <div className='text-sm text-red-500'>
          {form.fieldState.error.messsage}
        </div>
      )}
    </div>
  );
};

export default StepperInput;
