import { filter, includes } from 'lodash';
import { useMemo } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';

import ListingList from '@/components/ListingList';

const ListingFavoritesPage = () => {
  const { listings, favoriteListingIds } = useSelector(
    (state) => state.listings,
  );

  const favoriteListings = useMemo(
    () => filter(listings, ({ id }) => includes(favoriteListingIds, id)),
    [favoriteListingIds, listings],
  );

  return (
    <div className='container py-4'>
      <ListingList listings={favoriteListings} />
    </div>
  );
};

export default ListingFavoritesPage;
