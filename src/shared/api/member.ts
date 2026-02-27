import http from '@/shared/utils/http';

const baseUrl = '/hp';

export const MemberApi = {
  login(opt: Record<string, any>) {
    return http.create(baseUrl + '/api/member/login', opt);
  },
  logout() {
    return http.delete(baseUrl + '/api/member/logout');
  },
  signUp(opt: Record<string, any>) {
    return http.create(baseUrl + '/api/member/signup', opt);
  },
  dupIdCheck(clubCode: string, userId: string) {
    return http.read(baseUrl + `/api/member/name/check?clubCode=${clubCode}&id=${userId}`);
  },
  findId(opt: { clubCode: string; name: string; phone: string }) {
    return http.read(
      baseUrl + `/api/member/find-id?clubCode=${opt.clubCode}&name=${opt.name}&phone=${opt.phone}`
    );
  },
  changePassword(opt: Record<string, any>) {
    return http.update(baseUrl + '/api/member/change-password', opt);
  },
  changeCurrentPassword(opt: Record<string, any>) {
    return http.update(baseUrl + '/api/member/expiry/change-password', opt);
  },
  checkValidId(clubCode: string, id: string, phone: string) {
    return http.read(
      baseUrl + `/api/member/check?clubCode=${clubCode}&id=${id}&phone=${phone}`
    );
  },
  certification(opt: Record<string, any>) {
    return http.create(baseUrl + '/api/member/certification', opt);
  },
  checkCertification(opt: Record<string, any>) {
    return http.read(baseUrl + '/api/member/certification/check', opt);
  },
  refreshToken(opt: Record<string, any>) {
    return http.read(baseUrl + '/api/tokens/refresh', opt);
  },
  penalties(memberIdx: number | string, params?: Record<string, any>) {
    return http.read(baseUrl + `/api/info/${memberIdx}/penalties`, params);
  },
};
