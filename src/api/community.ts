import http from '@/utils/http';

const baseUrl = '/hp/api';
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export const communityApi = {
  askedQuestion(params?: Record<string, any>) {
    return http.read(baseUrl + '/faq', params);
  },
  notice(params?: Record<string, any>) {
    return http.read(baseUrl + '/notice', params);
  },
  noticeTop(params?: Record<string, any>) {
    return http.read(baseUrl + '/notice/top', params);
  },
  noticeDetail(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/notice/${idx}`, params);
  },
  reference(params?: Record<string, any>) {
    return http.read(baseUrl + '/reference', params);
  },
  referenceDetail(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/reference/${idx}`, params);
  },
  hallOfFame(params?: Record<string, any>) {
    return http.read(baseUrl + '/hof', params);
  },
  lost(params?: Record<string, any>) {
    return http.read(baseUrl + '/lost-item', params);
  },
  lostDetail(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/lost-item/${idx}`, params);
  },
  event(params?: Record<string, any>) {
    return http.read(baseUrl + '/event', params);
  },
  eventDetail(idx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/event/${idx}`, params);
  },
};
