import map from 'lodash/map';

import ReviewCard from '@/components/ReviewCard';

const ReviewsList = ({ reviews }) => {
  return (
    <div>
      <div className='flex flex-col gap-4'>
        {reviews.length > 0 ? (
          map(reviews, (review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <p>No Reviews Found</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
