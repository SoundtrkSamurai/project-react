import { useQuery } from '@tanstack/react-query';

import api from '@/api';

const useListingReviewsQuery = (listingId) => {
  return useQuery({
    queryKey: ['listing-reviews', listingId],
    queryFn: () => api.get(`/api/reviews`, { params: { listingId } }),
  });
};

export default useListingReviewsQuery;
