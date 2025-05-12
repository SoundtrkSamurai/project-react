import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import DateRangeInput from '@/components/DateRangeInput';
import Form from '@/components/Form';
import ImagesInput from '@/components/ImagesInput';
import SelectInput from '@/components/SelectInput';
import StepperInput from '@/components/StepperInput';
import TextInput from '@/components/TextInput';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Separator,
} from '@/components/ui';
import useCreateListingMutation from '@/hooks/mutations/useCreateListingMutation';

const createListingFormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  locationId: z.coerce.number(),
  images: z.array(z.string()).min(1),
  price: z.coerce
    .number({
      invalid_type_error: 'Price must be a whole number',
    })
    .min(1),
  maxGuests: z.number().min(1),
  availability: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

const CreateListingForm = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(createListingFormSchema),
    defaultValues: {
      maxGuests: 1,
    },
  });

  const createListingMutation = useCreateListingMutation();

  const onSumbit = async (listing) => {
    try {
      const { data } = await createListingMutation.mutateAsync(listing);
      navigate(`/listings/${data.id}`);
    } catch (error) {
      form.setError('root', {
        message: error.response.data.message,
      });
    }
  };

  const locationOptions = [
    { label: 'London', value: 1 },
    { label: 'Paris', value: 2 },
  ];

  return (
    <Card className='x-auto w-[900px] max-w-full'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Create Listing</h2>
        <p className='text-center text-muted-foreground'>
          Create a new listing
        </p>
        <Separator className='mb-4' />
        <CardContent>
          <Form form={form}>
            <TextInput
              control={form.control}
              name='name'
              placeholder='Listing Name'
            />
            <TextInput
              control={form.control}
              name='description'
              placeholder='Description'
              type='textarea'
              rows={4}
            />
            <SelectInput
              control={form.control}
              name='locationId'
              options={locationOptions}
              placeholder={'Select a location'}
            ></SelectInput>
            <ImagesInput control={form.control} name='images' />
            <TextInput
              control={form.control}
              name='price'
              placeholder='Price per night'
            />
            <StepperInput
              control={form.control}
              label='Max Guests'
              name='maxGuests'
            />
            <DateRangeInput
              control={form.control}
              minDate={new Date()}
              name='availability'
              placeholder='Select availability'
            />
            <Button
              disabled={createListingMutation.isPending}
              onClick={form.handleSubmit(onSumbit)}
            >
              {createListingMutation.isPending
                ? 'Creating...'
                : 'Create Listing'}
            </Button>
          </Form>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default CreateListingForm;
