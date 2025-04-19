import { DollarSign, Pin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

import ListingCardImages from '@/components/ListingCardImages';
import { Card, CardContent } from '@/components/ui';

const ListingCard = ({
  listing: { name, images, price, location, maxGuests, id },
}) => {
  return (
    <Link to={`/listings/${id}`}>
      <Card className='w-[320px]'>
        <ListingCardImages listing={{ images, name }} />
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
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
