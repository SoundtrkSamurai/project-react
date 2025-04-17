import { filter, includes, toLower } from 'lodash';
import { useEffect, useState } from 'react';

import api from '@/api';
import {
  isListingAvailable,
  listings as staticListings,
} from '@/api/data/listings';
import ListingFilters from '@/components/ListingFilters';
import ListingList from '@/components/ListingList';
import { Separator } from '@/components/ui';

const HomePage = () => {
  const [listings, setListings] = useState(staticListings);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await api.get('/api/listings');
      setListings(response.data);
    };

    fetchListings();
  }, []);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    let filteredListings = staticListings;

    if (dates) {
      filteredListings = filter(filteredListings, (listing) =>
        isListingAvailable(listing, dates),
      );
    }

    if (guests) {
      filteredListings = filter(
        filteredListings,
        (listing) => guests < listing.maxGuests,
      );
    }

    if (search) {
      filteredListings = filter(filteredListings, (listing) =>
        includes(toLower(listing.name), toLower(search)),
      );
    }

    setListings(filteredListings);
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};

export default HomePage;
