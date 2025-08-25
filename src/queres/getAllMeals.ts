import { apiBase } from '@/lib/axios';
import { useSuspenseQuery } from '@tanstack/react-query';
export default function useMealsQuery() {
  return useSuspenseQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await apiBase.get('/meals');
      return res.data;
    },
    staleTime: 1000 * 60 * 1, 
  });
};
