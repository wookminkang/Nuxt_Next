import http from '@/utils/http';

const baseUrl = '/hp';

export const termsApi = {
  terms(clubCode: string, types: string[]) {
    return http.read(baseUrl + '/api/terms', { clubCode, types: types.join(',') });
  },
  updateTerms(opt: Record<string, any>) {
    return http.update(baseUrl + '/api/terms', opt);
  },
  term(idx: number | string) {
    return http.read(baseUrl + `/api/terms/${idx}`);
  },
  checkTerms(idx: number | string, date: string) {
    return http.read(baseUrl + `/api/terms/check/${idx}/${date}`);
  },
  beforeTerm(idx: number | string) {
    return http.read(baseUrl + `/api/terms/before/${idx}`);
  },
};
