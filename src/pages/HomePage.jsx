import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import api from '@/api';
import DataRenderer from '@/components/DataRenderer';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { fetchListings } from '@/state/listings/listingsSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({ params: filters }), [filters]);

  const {
    data: { data: listings } = {},
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['listings', fetchOptions],
    queryFn: () => api.get('/api/listings', fetchOptions),
  });

  const handleFilters = useCallback((filters) => {
    setFilters(filters);
  }, []);

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <DataRenderer error={isError} isLoading={isLoading}>
        <ListingList listings={listings} />
      </DataRenderer>
    </div>
  );
};

export default HomePage;
