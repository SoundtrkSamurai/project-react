import { map } from 'lodash';

import ListingCard from '@/components/ListingCard';

const ListingList = ({ listings }) => {
  return (
    <>
      {listings.length > 0 ? (
        <div
          className='flex flex-wrap justify-center gap-4'
          data-testid='listing-list'
        >
          {map(listings, (listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <p data-testid='no-results'>No listings found</p>
      )}
    </>
  );
};

export default ListingList;
