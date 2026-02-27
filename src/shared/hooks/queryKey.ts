import { communityApi } from '@/shared/api/community';

export const initQueryKey = {
  list: (boardTitle: string, params?: any) => [`${boardTitle}`, 'list', params],
  detail: (boardTitle: string, id: string | number) => [`${boardTitle}`, 'detail', id],
};

export const useBoardQuery = {
  get: async (boardTitle: string, fromDate?: string, toDate?: string, text?: string, size?: string) => {
    const methodName = `get${boardTitle}List` as keyof typeof communityApi;
    if (typeof communityApi[methodName] === 'function') {
      const res = await (communityApi[methodName] as Function)(fromDate || '', toDate || '', text || '', size || '');
      return res?.data;
    }
  },
  list: (boardTitle: string, params?: any) => [`${boardTitle}`, 'list', params],
  detail: (boardTitle: string, id: string | number) => [`${boardTitle}`, 'detail', id],
};
