import { Link } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Separator,
} from '@/components/ui';
import { useAuth } from '@/context/AuthProvider';
import useSignOutMutation from '@/hooks/mutations/useSignOutMutation';

const Navbar = () => {
  const { setToken, setUser } = useAuth();

  const signOutMutation = useSignOutMutation();

  const handleSignOut = async () => {
    try {
      signOutMutation.mutateAsync();
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  return (
    <>
      <div className='flex flex-row items-center justify-between gap-8 px-8 py-4'>
        <Link to='/'>Home</Link>
        <div className='flex flex-row items-center gap-8 flex-end'>
          <Link to='/listings/create'>Create Listing</Link>
          <Link to='/favorites'>Favorites</Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Link>Account</Link>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <Link to='/profile'>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
