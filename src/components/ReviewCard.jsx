import { useSelector } from 'react-redux';

import ReviewCardStars from './ReviewCardStars';
import { Card, CardContent, Separator } from './ui';
import UserAvatar from './UserAvatar';

const ReviewCard = ({ review }) => {
  const { users } = useSelector((state) => state.users);
  const reviewUser = users[review.userId];
  return (
    <Card className='p-4'>
      <CardContent className='px-0'>
        <div className='flex flex-row items-center justify-between'>
          <h3 className='mb-0'>{review.title}</h3>
          <ReviewCardStars review={review} />
        </div>
      </CardContent>
      <Separator className='mb-4' />
      {reviewUser && (
        <>
          <UserAvatar user={reviewUser} />
          <Separator className='my-4' />
        </>
      )}
      <div className='whitespace-pre-line'>{review.comment}</div>
    </Card>
  );
};

export default ReviewCard;
