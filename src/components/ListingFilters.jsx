import { Search } from 'lucide-react';
import { memo, useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

const ListingFilters = ({ onChange }) => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  const handleSumbit = () => {
    onChange({ dates, guests, search });
  };

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        className='w-[400px]'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search destinations'
        value={search}
      />
      <DateRangePicker
        minDate={new Date()}
        onChange={setDates}
        placeholder='Add dates'
        value={dates}
      />
      <Stepper label='guest' value={guests} onChange={setGuests} />
      <Button onClick={handleSumbit}>
        <Search className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default memo(ListingFilters);
