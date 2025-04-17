import { map } from 'lodash';

import ListingCard from '@/components/ListingCard';

const ListingList = ({ listings }) => {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings.length > 0 ? (
        map(listings, (listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))
      ) : (
        <p>No listings found</p>
      )}
    </div>
  );
};

export default ListingList;
