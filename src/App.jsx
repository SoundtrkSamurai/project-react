import Devbar from '@/components/Devbar/Devbar';
import HomePage from '@/pages/HomePage';

const App = () => {
  return (
    <>
      <div className='fixed top-0 bottom-0 left-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        <HomePage />
      </div>
    </>
  );
};

export default App;
