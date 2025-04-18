import { DollarSign, Pin, Users } from 'lucide-react';
import React from 'react';

import { Card, Separator } from '@/components/ui';

const ListingDestailsCard = ({
  listing: { name, maxGuests, description, location, price },
}) => {
  return (
    <Card className='p-4 mx-auto'>
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
      <Separator className='my-4' />
      <div className='whitespace-pre-line'>{description}</div>
    </Card>
  );
};

export default ListingDestailsCard;
