import { Spinner } from '@/components/ui';

const DataRenderer = ({ children, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return children;
};

export default DataRenderer;
