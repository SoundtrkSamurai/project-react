import React from 'react';

const Form = ({ children, form }) => {
  return (
    <form className='flex flex-col gap-4'>
      {children}
      {form.formState.errors['root'] && (
        <div className='mt-2 text-sm text-center text-red-500'>
          {form.formState.errors['root'].message}
        </div>
      )}
    </form>
  );
};

export default Form;
