import { useController } from 'react-hook-form';

import { DateRangePicker } from '@/components/ui';

const DateRangeInput = ({ control, name, placeholder, minDate, maxDate }) => {
  const form = useController({ control, name });

  return (
    <div>
      <DateRangePicker
        maxDate={maxDate}
        minDate={minDate}
        onChange={form.field.onChange}
        placeholder={form.field.placeholder}
        value={form.field.value}
      />
      {form.fieldState.error?.message && (
        <div className='text-sm text-red-500'>
          {form.fieldState.error.messsage}
        </div>
      )}
    </div>
  );
};

export default DateRangeInput;
