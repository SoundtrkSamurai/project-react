import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import ListingFavoriteButton from '@/components/ListingFavoriteButton';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({
  listing: { name, images, price, location, maxGuests, id },
}) => {
  return (
    <Link to={`/listings/${id}`}>
      <Card className='w-[320px]'>
        <div className='relative'>
          <ListingCardImages listing={{ images, name }} />
          <ListingFavoriteButton
            listing={{ id }}
            className='absolute right-2 top-2 z-10'
          />
        </div>
        <CardContent className='flex flex-col gap-2 p-4'>
          <h2 className='mb-2 text-xl font-semibold'>{name}</h2>
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
