import { useQuery } from '@tanstack/react-query';
import http from '@/utils/http';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await http.instance().get('/posts');
      return data;
    },
  });
};
