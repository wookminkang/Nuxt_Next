import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/shared/api/axios-instance';
import { community } from '@/shared/api/community';


// export const useBoardQuery = () => {
//   return {
//     get: async (boardTitle: string) => {
//       // notice, event
//       let getName;
//       getName = `get${boardTitle}List`

//       return await community.getName(boardTitle);
//     },
//     list: (boardTitle: string) => {
//       return [`${boardTitle}`, 'list']
//     },
//     detail: (boardTitle: string, id: string | number) => {
//       return [`${boardTitle}`, 'detail', id]
//     }
//   }
// }


export const useBoardQuery = {
  get: async (boardTitle: string, fromDate?: string, toDate?: string, text?: string, size?: string) => {
    const methodName = `get${boardTitle}List` as keyof typeof community;
    return await community[methodName](fromDate || '', toDate || '', text || '', size || '');
  },
  list: (boardTitle: string, params?
    : any) => {
    return [`${boardTitle}`, 'list', params]
  },
  detail: (boardTitle: string, id: string | number) => {
    return [`${boardTitle}`, 'detail', id]
  },
}