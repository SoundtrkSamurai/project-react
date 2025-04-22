import { includes } from 'lodash';
import { Heart } from 'lucide-react';
import React from 'react';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import {
  addFavoriteListing,
  removeFavoriteListing,
} from '@/state/listings/listingsSlice';

const ListingFavoriteButton = ({ className, listing: { id } }) => {
  const favoriteListingIds = useSelector(
    (state) => state.listings.favoriteListingIds,
  );
  const dispatch = useDispatch();
  const isFavorite = useMemo(
    () => includes(favoriteListingIds, id),
    [favoriteListingIds, id],
  );

  return (
    <Button
      className={className}
      variant='outline'
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isFavorite) {
          dispatch(removeFavoriteListing({ id }));
        } else {
          dispatch(addFavoriteListing({ id }));
        }
      }}
    >
      <Heart
        className={cn('h-4 w-4', { 'fill-primary text-primary': isFavorite })}
      />
    </Button>
  );
};

export default ListingFavoriteButton;
