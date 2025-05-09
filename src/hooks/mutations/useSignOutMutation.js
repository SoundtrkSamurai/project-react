import { useMutation } from '@tanstack/react-query';

import api from '@/api';

const useSignOutMutation = () => {
  return useMutation({
    mutation: (data) => api.post('/api/signout'),
  });
};

export default useSignOutMutation;
