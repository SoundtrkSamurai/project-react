import { Outlet } from 'react-router-dom';

import Devbar from '@/components/Devbar/Devbar';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthProvider';

const App = () => {
  const { token } = useAuth();
  return (
    <>
      <div className='fixed top-0 bottom-0 left-0'>
        <Devbar />
      </div>
      <div className='ml-[700px]'>
        {token && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default App;
