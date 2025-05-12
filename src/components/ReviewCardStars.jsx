import map from 'lodash/map';
import { Star } from 'lucide-react';

import { cn } from '@/lib/utils/cn';

const ReviewCardStars = ({ className, review }) => {
  return (
    <div className={cn('inline-flex flex-row items-center', className)}>
      {map([...Array(5)], (_, index) => (
        <Star
          key={index}
          className={cn('w5 h-5 fill-secondary text-secondary', {
            'fill-star text-star': index < review.rating,
          })}
        />
      ))}
    </div>
  );
};

export default ReviewCardStars;
