import http from '@/utils/http';

const baseUrl = '/hp/api';
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export const weatherApi = {
  weatherWidget() {
    return http.read(baseUrl + '/weather/widget', { clubCode: gCode });
  },
  weatherDetail() {
    return http.read(baseUrl + '/weather', { clubCode: gCode });
  },
};
