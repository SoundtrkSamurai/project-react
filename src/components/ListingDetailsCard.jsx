import { DollarSign, Pin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, Separator } from '@/components/ui';

import UserAvatar from './UserAvatar';

const ListingDetailsCard = ({
  listing: {
    description,
    id,
    images,
    location,
    maxGuests,
    name,
    price,
    userId,
  },
}) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[userId];
  return (
    <Card className='p-4 mx-auto'>
      <ListingDetailsCardImages listing={{ images, name }} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{name}</h1>
          <div className='flex items-center gap-2'>
            <DollarSign className='w-4 h-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{price}</span> / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='w-4 h-4 text-primary' />
            <span className='text-muted-foreground'>{location.name}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='w-4 h-4 text-primary' />
            <span className='text-muted-foreground'>{maxGuests} Guests</span>
          </div>
        </div>
        <ListingFavoriteButton listing={{ id }} />
      </div>
      <Separator className='my-4' />
      {listingUser && (
        <>
          <UserAvatar user={listingUser} />
          <Separator className='my-4' />
        </>
      )}
      <div className='whitespace-pre-line'>{description}</div>
    </Card>
  );
};

export default ListingDetailsCard;
