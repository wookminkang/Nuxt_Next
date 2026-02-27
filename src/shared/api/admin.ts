import http from '@/shared/utils/http';

const baseUrl = '/hp/api';

export const adminApi = {
  // 대시보드
  dashboard() {
    return http.read(baseUrl + '/dashboard', { period: 0 });
  },
  periods(period: number) {
    return http.read(baseUrl + '/dashboard/periods', { period });
  },
  addAdminPhotos(idx: number | string, file: File) {
    return http.post(baseUrl + `/admin/${idx}/photos`, {}, file, true);
  },
  removeAdminPhotos(idx: number | string) {
    return http.delete(baseUrl + `/admin/${idx}/photos`);
  },

  // 사이트관리 - 기본정보
  clubInfo() {
    return http.read(baseUrl + '/site/info');
  },
  updateClubInfo(list: any, files?: File[]) {
    return http.update(baseUrl + '/site/info', list, files, true);
  },
  findTaxNo(type: number, keyword: string) {
    return http.read(baseUrl + '/site/info/valid/taxno', { type, keyword });
  },

  // 사이트관리 - 부가정보
  clubExtInfo() {
    return http.read(baseUrl + '/site/addition');
  },
  updateClubExtInfo(list: any, files?: File[]) {
    return http.update(baseUrl + '/site/addition', list, files, true);
  },

  // 사이트관리 - SSL/TLS인증
  cert() {
    return http.read(baseUrl + '/site/cert');
  },
  updateCert(list: any) {
    return http.update(baseUrl + '/site/cert', list);
  },

  // 사이트관리 - 오픈관리
  state() {
    return http.read(baseUrl + '/site/state');
  },
  updateState(list: any) {
    return http.update(baseUrl + '/site/state', list);
  },

  // 사이트관리 - 약관관리
  terms() {
    return http.read(baseUrl + '/terms');
  },
  termsDetail(idx: number | string) {
    return http.read(baseUrl + `/terms/${idx}`);
  },
  checkOverwrite(idx: number | string, date: string) {
    return http.read(baseUrl + `/terms/${idx}/${date}`);
  },
  beforeTerm(idx: number | string) {
    return http.read(baseUrl + `/terms/before/${idx}`);
  },
  updateTerms(list: any) {
    return http.update(baseUrl + '/terms', list);
  },

  // 사이트관리 - 사용자 관리
  users() {
    return http.read(baseUrl + '/admin');
  },
  userDetail(idx: number | string) {
    return http.read(baseUrl + `/admin/${idx}`);
  },
  addUsers(list: any) {
    return http.create(baseUrl + '/admin', list);
  },
  updateUsers(list: any) {
    return http.update(baseUrl + '/admin', list);
  },
  removeUsers(list: any) {
    return http.delete(baseUrl + '/admin', list);
  },
  resetPass(list: any) {
    return http.update(baseUrl + '/admin/reset-pw', list);
  },
  checkId(id: string) {
    return http.read(baseUrl + `/admin/check-id/${id}`);
  },

  // 메뉴 관리 - 관리자 접근권한
  groups() {
    return http.read(baseUrl + '/menu-admins/groups');
  },
  addGroups(list: any) {
    return http.create(baseUrl + '/menu-admins/groups', list);
  },
  simpleMenus() {
    return http.read(baseUrl + '/menus/simple');
  },

  // 게시물 관리 - 공지사항 관리
  notice(opt?: Record<string, any>) {
    return http.read(baseUrl + '/notice/admin', opt);
  },
  noticeDetail(idx: number | string) {
    return http.read(baseUrl + `/notice/${idx}`);
  },
  addNotice(list: any, files?: File[]) {
    return http.create(baseUrl + '/notice', list, files, true);
  },
  updateNotice(list: any, files?: File[]) {
    return http.update(baseUrl + '/notice', list, files, true);
  },
  removeNotice(list: any) {
    return http.delete(baseUrl + '/notice', list);
  },

  // 게시물 관리 - 자료실 관리
  data(opt?: Record<string, any>) {
    return http.read(baseUrl + '/reference/admin', opt);
  },
  dataDetail(idx: number | string) {
    return http.read(baseUrl + `/reference/${idx}`);
  },
  addData(list: any, files?: File[]) {
    return http.create(baseUrl + '/reference', list, files, true);
  },
  updateData(list: any, files?: File[]) {
    return http.update(baseUrl + '/reference', list, files, true);
  },
  removeData(list: any) {
    return http.delete(baseUrl + '/reference', list);
  },

  // 게시물 관리 - 이벤트 관리
  event(opt?: Record<string, any>) {
    return http.read(baseUrl + '/event', opt);
  },
  eventDetail(idx: number | string) {
    return http.read(baseUrl + `/event/${idx}`);
  },
  addEvent(list: any, files?: File[]) {
    return http.create(baseUrl + '/event', list, files, true);
  },
  updateEvent(list: any, files?: File[]) {
    return http.update(baseUrl + '/event', list, files, true);
  },
  removeEvent(list: any) {
    return http.delete(baseUrl + '/event', list);
  },
  cloneEvent(idx: number | string) {
    return http.create(baseUrl + '/event/clone', { idx });
  },

  // 게시물 관리 - 자주찾는 질문 관리
  faq(opt?: Record<string, any>) {
    return http.read(baseUrl + '/faq', opt);
  },
  faqDetail(idx: number | string) {
    return http.read(baseUrl + `/faq/${idx}`);
  },
  addFaq(list: any) {
    return http.create(baseUrl + '/faq', list);
  },
  updateFaq(list: any) {
    return http.update(baseUrl + '/faq', list);
  },
  removeFaq(list: any) {
    return http.delete(baseUrl + '/faq', list);
  },

  // 게시물 관리 - 배너 관리
  banner(opt?: Record<string, any>) {
    return http.read(baseUrl + '/banner', opt);
  },
  bannerDetail(idx: number | string) {
    return http.read(baseUrl + `/banner/${idx}`);
  },
  addBanner(list: any, files?: File[]) {
    return http.create(baseUrl + '/banner', list, files, true);
  },
  updateBanner(list: any, files?: File[]) {
    return http.update(baseUrl + '/banner', list, files, true);
  },
  removeBanner(list: any) {
    return http.delete(baseUrl + '/banner', list);
  },
  cloneBanner(idx: number | string) {
    return http.create(baseUrl + '/banner/clone', { idx });
  },

  // 메뉴 관리 - 홈페이지 메뉴 설정
  menus(opt?: Record<string, any>) {
    return http.read(baseUrl + '/menus', opt);
  },
  menuDetail(idx: number | string) {
    return http.read(baseUrl + `/menus/${idx}`);
  },
  updateMenus(list: any, files?: File[]) {
    return http.update(baseUrl + '/menus', list, files, true);
  },

  // 메뉴 관리 - 관리자 접근권한
  adminGroup() {
    return http.read(baseUrl + '/menu-admins/groups');
  },
  updateAdminGroup(list: any) {
    return http.update(baseUrl + '/menu-admins/groups', list);
  },
  addAdminGroup(list: any) {
    return http.create(baseUrl + '/menu-admins/groups', list);
  },
  removeAdminGroup(list: any) {
    return http.delete(baseUrl + '/menu-admins/groups', list);
  },
  cloneAdminGroup(idx: number | string) {
    return http.update(baseUrl + `/menu-admins/groups/${idx}/copy`);
  },
  moveAdminGroup(list: any) {
    return http.update(baseUrl + '/admin/move', list);
  },
  applyGroupPerm(idx: number | string) {
    return http.update(baseUrl + `/menu-admins/admins/${idx}/apply`);
  },
  applyGroupPermAll(idx: number | string) {
    return http.update(baseUrl + `/menu-admins/groups/${idx}/apply`);
  },
  groupPerm(idx: number | string) {
    return http.read(baseUrl + `/menu-admins/groups/${idx}`);
  },
  userPerm(idx: number | string) {
    return http.read(baseUrl + `/menu-admins/admins/${idx}`);
  },
  updatePerm(list: any) {
    return http.update(baseUrl + '/menu-admins', list);
  },

  // 관리자 비밀번호 재설정
  changePasswordAdmin(opt: Record<string, any>) {
    return http.update(baseUrl + '/admin/change-password', opt);
  },
};
