import { useQuery } from '@tanstack/react-query';
import { filter, includes } from 'lodash';
import { useMemo } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';

import api from '@/api';
import DataRenderer from '@/components/DataRenderer';
import ListingList from '@/components/ListingList';

const ListingFavoritesPage = () => {
  const { favoriteListingIds } = useSelector((state) => state.listings);

  const {
    data: { data: listings } = {},
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['listings'],
    queryFn: () => api.get('/api/listings'),
  });

  const favoriteListings = useMemo(
    () => filter(listings || [], ({ id }) => includes(favoriteListingIds, id)),
    [favoriteListingIds, listings],
  );

  return (
    <div className='container py-4'>
      <DataRenderer error={isError} isLoading={isLoading}>
        <ListingList listings={favoriteListings} />
      </DataRenderer>
    </div>
  );
};

export default ListingFavoritesPage;
