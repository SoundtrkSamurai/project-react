import { DollarSign, Pin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';

import ListingDetailsCardImages from '@/components/ListingDetailsCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, Separator } from '@/components/ui';

import ListingRatingStars from './ListingRatingStars';
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
    rating,
  },
}) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[userId];
  return (
    <Card className='mx-auto p-4'>
      <ListingDetailsCardImages listing={{ images, name }} />
      <Separator className='my-4' />
      <div className='flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='mb-2 text-2xl font-bold'>{name}</h1>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>
              <span className='font-bold text-foreground'>{price}</span> / night
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Pin className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>{location.name}</span>
          </div>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-primary' />
            <span className='text-muted-foreground'>{maxGuests} Guests</span>
          </div>
        </div>
        <div>
          <ListingRatingStars
            className='mr-2 bg-transparent px-0 py-0'
            listing={{ rating }}
          />
          <ListingFavoriteButton listing={{ id }} />
        </div>
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
