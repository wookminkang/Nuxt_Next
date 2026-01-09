import axiosInstance from './axios-instance';

const API_URL = 'http://0.0.0.0:3000/hp/api/notice/normal';

const community = {
  getNoticeList: async (fromDate: string, toDate: string, text?: string, size?: string) => {
    const res = await fetch(`${API_URL}?clubCode=388W4&fromDate=${fromDate}&toDate=${toDate}&size=${size}&page=0&post=true${text && `&text=${text}`}`);
    const { data } = await res.json(); 
    return data;
  }
}

export { community };