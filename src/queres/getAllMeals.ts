import { apiBase } from '@/lib/axios';
import { useSuspenseQuery } from '@tanstack/react-query';
export default function useMealsQuery() {
  return useSuspenseQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await apiBase.get('/meals');
      if (res.status !== 200 || !res.data) {
        console.log({ meals_response: res });
        throw new Error('Failed to fetch meals data');
      }
      return res.data;
    },
    staleTime: 1000 * 60 * 1, 
  });
};
