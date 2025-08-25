import { apiBase } from '@/lib/axios';
import { useSuspenseQuery } from '@tanstack/react-query';
export default function useTermsQuery() {
  return useSuspenseQuery({
    queryKey: ['terms'],
    queryFn: async () => {
      const res = await apiBase.get('/page/2');
      return res.data.data;
    },
    staleTime: 1000 * 60 * 1, 
  });
};
