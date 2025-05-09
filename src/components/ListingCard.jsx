import { DollarSign, Pin, Users } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, CardContent, Separator } from '@/components/ui';

import UserAvatar from './UserAvatar';

const ListingCard = ({
  listing: { name, images, price, location, maxGuests, id, userId },
}) => {
  const { users } = useSelector((state) => state.users);

  const listingUser = users[userId];
  return (
    <Link to={`/listings/${id}`}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={{ images, name }} />
          <ListingFavoriteButton
            listing={{ id }}
            className='absolute z-10 right-2 top-2'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{name}</h2>
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
          {listingUser && (
            <>
              <Separator className='my-4' />
              <UserAvatar user={listingUser} />
            </>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
