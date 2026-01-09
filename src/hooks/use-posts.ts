import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/shared/api/axios-instance';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/posts');
      return data;
    },
  });
};
