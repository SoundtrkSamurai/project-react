import { map } from 'lodash';
import React, { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingDetailsCardImages = ({ listing: { images, name } }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
    <>
      <img
        className='mb-4 h-[500px] w-full rounded-md object-cover'
        src={getImageUrl(images[currentImageIndex])}
        alt={name}
      />
      <Carousel className='mx-auto mb-4 w-[90%]'>
        <CarouselContent>
          {map(images, (image, index) => (
            <CarouselItem
              key={image}
              className='cursor-pointer basis-1/3'
              onClick={() => setCurrentImageIndex(index)}
              isSelected={currentImageIndex === index}
            >
              <img
                className='object-cover w-full shadow-sm h-52'
                src={getImageUrl(image)}
                alt={name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default ListingDetailsCardImages;
