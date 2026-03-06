import http from '@/utils/http';

const baseUrl = '/hp/api';
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export const commonApi = {
  getCodes(code: string) {
    return http.read(baseUrl + `/common/system-code/${gCode}`, { code });
  },
  getMenus() {
    return http.read(baseUrl + `/menus/club/${gCode}`);
  },
  getView() {
    return http.update(baseUrl + `/dashboard/increment/club/${gCode}`);
  },
  getBanner(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/banner/page/${idx}`, params);
  },
  getPassword(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/menus/${idx}/password`, params);
  },
  getState() {
    return http.read(baseUrl + `/site/state?clubCode=${gCode}`);
  },
  getHolidays() {
    return http.read(baseUrl + '/holiday');
  },
};
