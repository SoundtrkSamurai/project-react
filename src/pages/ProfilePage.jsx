import { filter } from 'lodash';
import { useMemo } from 'react';

import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';
import { Card, CardContent } from '@/components/ui';
import UserAvatar from '@/components/UserAvatar';
import { useAuth } from '@/context/AuthProvider';
import useListingsQuery from '@/hooks/queries/useListingsQuery';
import { displayName } from '@/lib/utils/displayName';

const ProfilePage = () => {
  const { user } = useAuth();

  const {
    data: { data: listings } = {},
    error,
    isLoading,
  } = useListingsQuery();

  const userListing = useMemo(() => {
    if (!listings) return [];

    return filter(listings, (listing) => listing.userId === user.id);
  }, [listings, user.id]);

  return (
    <div className='container py-4'>
      <div className='flex flex-col items-center mb-4'>
        <UserAvatar
          className='mb-4 h-[150px] w-[150px]'
          imageOnly
          user={user}
        />
        <h1 className='text-center'>{displayName(user)}</h1>
      </div>
      <Card className='pt-4 mb-8'>
        <CardContent>
          <div className='whitespace-pre-line'>{user.bio}</div>
        </CardContent>
      </Card>
      <div>
        <h2 className='mb-4'>Your Listings</h2>
        <DataRenderer error={error} isLoading={isLoading}>
          <ListingList listings={userListing} />
        </DataRenderer>
      </div>
    </div>
  );
};

export default ProfilePage;
