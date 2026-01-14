import http from '@/shared/utils/http';

const API_URL = '/hp/api/notice/normal';

const API_HOST = process.env.NEXT_PUBLIC_BASE_URL;

const community = {
  getNoticeList: async (fromDate: string, toDate: string, text?: string, size?: string) => {
    console.log(`API_URL =>`, API_URL);
    const clubCode = process.env.NEXT_PUBLIC_G_CODE || '';
    const res = await fetch(`${API_HOST}${API_URL}?clubCode=${clubCode}&fromDate=${fromDate}&toDate=${toDate}&size=${size}&page=0&post=true${text && `&text=${text}`}`);
    const { data } = await res.json(); 
    return data;
  },

  getEventList: async (params: {page?: number | string, size?: number | string, post?: boolean }) => {
    const clubCode = process.env.NEXT_PUBLIC_G_CODE || '';
    const res = await http.get(`/hp/api/event?clubCode=${clubCode}&page=${params.page}&size=${params.size}&post=${params.post}&progress=0`);
    const { data } = res.data;
    return data;
  },
  getMainNoticeList: async () => {
    const clubCode = process.env.NEXT_PUBLIC_G_CODE || '';
    const res = await fetch(`${API_HOST}/hp/api/notice?clubCode=${clubCode}&post=true`);
    const { data } = await res.json();
    return data;
  },
  
}

export { community };