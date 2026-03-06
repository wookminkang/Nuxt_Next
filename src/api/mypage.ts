import http from '@/utils/http';

const baseUrl = '/hp/api';

export const mypageApi = {
  info(memberIdx: number | string) {
    return http.read(baseUrl + `/info/${memberIdx}`);
  },
  updateInfo(params: Record<string, any>) {
    return http.update(baseUrl + '/info', params);
  },
  deleteInfo(memberIdx: number | string) {
    return http.delete(baseUrl + '/info', memberIdx);
  },
  impossible(memberIdx: number | string, clubCode: string) {
    return http.read(baseUrl + `/info/impossible/${clubCode}/${memberIdx}`);
  },
  withdrawalReason(list: any) {
    return http.create(baseUrl + '/info/delete_reason', list);
  },
  checkPw(params: Record<string, any>) {
    return http.create(baseUrl + '/info/check-password', params);
  },
  createProfile(memberIdx: number | string, files: File[]) {
    return http.create(baseUrl + `/info/${memberIdx}/photos`, null, files, true);
  },
  deleteProfile(memberIdx: number | string) {
    return http.delete(baseUrl + `/info/${memberIdx}/photos`);
  },

  // 고객센터(VOC)
  cs(params?: Record<string, any>) {
    return http.read(baseUrl + '/voc', params);
  },
  csOnce(idx: number | string) {
    return http.read(baseUrl + `/voc/${idx}`);
  },
  createCs(params: Record<string, any>) {
    return http.create(baseUrl + '/voc', params);
  },
  updateCs(params: Record<string, any>) {
    return http.update(baseUrl + '/voc', params);
  },
  deleteCs(idx: number | string) {
    return http.delete(baseUrl + '/voc', idx);
  },

  // 예약 내역
  reservation(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/my-reservation/bookings/${memberIdx}`, params);
  },
  wating(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/my-reservation/waitings/${memberIdx}`, params);
  },
  lottery(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/my-reservation/draw/${memberIdx}`, params);
  },
  penalty(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/my-reservation/penalty/${memberIdx}`, params);
  },
  frontdesk(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/my-reservation/frontdesk/${memberIdx}`, params);
  },

  // 쿠폰
  coupon(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/coupon/${memberIdx}`, params);
  },
  couponCount(memberIdx: number | string) {
    return http.read(baseUrl + `/coupon/count/${memberIdx}`);
  },
};
