import { Card, CardContent } from '@/components/ui';
import { getImageUrl } from '@/lib/utils/images';

const ListingCard = ({ listing: { name, images } }) => {
  return (
    <Card className='w-[320px]'>
      <img
        className='h-[200px] w-full rounded-md object-cover'
        src={getImageUrl(images[0])}
        alt={name}
      />
      <CardContent className='p-4'>
        <h2 className='mb-0 text-xl font-semibold'>{name}</h2>
      </CardContent>
    </Card>
  );
};

export default ListingCard;
