import http from '@/shared/utils/http';

const baseUrl = '/hp/api/reservation';
const gCode = process.env.NEXT_PUBLIC_G_CODE;

export const reservationApi = {
  // 예약 가능 횟수
  availableCount(memberIdx: number | string, date: string) {
    return http.read(baseUrl + `/${memberIdx}/${date}/cnt`);
  },

  // 예약 시트 목록
  sheets(memberIdx: number | string | null, date: string, params?: Record<string, any>) {
    const url = memberIdx
      ? `/sheets/${memberIdx}/${date}`       // 회원
      : `/sheets/non-member/${gCode}/${date}`; // 비회원
    return http.read(baseUrl + url, params);
  },

  // 예약 시트 상세
  sheet(memberIdx: number | string, date: string, sheetIdx: number | string) {
    return http.read(baseUrl + `/sheets/${memberIdx}/${date}/${sheetIdx}`);
  },

  // 예약 등록
  addReservation(list: any) {
    return http.create(baseUrl + '/booking', list);
  },

  // 예약 취소
  cancelReservation(list: any) {
    return http.delete(baseUrl + '/cancel', list);
  },

  // 예약 시트 상태 변경 (예약 가능 → 가예약)
  updateLockStatus(sheetIdx: number | string) {
    return http.update(baseUrl + `/sheet/lock/${sheetIdx}`);
  },

  // 예약 시트 상태 변경 (가예약 → 예약 가능)
  updateUnLockStatus(sheetIdx: number | string, lockKey: string) {
    return http.update(baseUrl + `/sheet/lock/${sheetIdx}/${lockKey}`);
  },

  // 캘린더 조회
  calendar(yearMonth: string) {
    return http.read(baseUrl + `/calendar/${yearMonth}`, { clubCode: gCode });
  },

  // 대기 예약 상세
  waiting(memberIdx: number | string, date: string) {
    return http.read(baseUrl + `/waitings/${memberIdx}/${date}`);
  },

  // 대기 예약 등록
  addWaiting(list: any) {
    return http.create(baseUrl + '/waitings', list);
  },

  // 대기 예약 취소
  cancelWaiting(idx: number | string) {
    return http.delete(baseUrl + `/waitings/${idx}`);
  },

  // 추첨 상세
  lottery(memberIdx: number | string, date: string) {
    return http.read(baseUrl + `/draw/${memberIdx}/${date}`);
  },

  // 추첨 등록
  addLottery(list: any) {
    return http.create(baseUrl + '/draw', list);
  },

  // 추첨 취소
  cancelLottery(idx: number | string) {
    return http.delete(baseUrl + `/draw/${idx}`);
  },

  // 추첨 결과 목록
  lotteryResults(params?: Record<string, any>) {
    return http.read(baseUrl + '/draw/posts', { ...params, clubCode: gCode });
  },

  // 추첨 결과 상세
  lotteryResult(memberIdx: number | string | null, date: string) {
    const url = memberIdx
      ? `/draw/posts/${memberIdx}/${date}`              // 회원
      : `/draw/posts/non-member/${gCode}/${date}`;      // 비회원
    return http.read(baseUrl + url);
  },

  // 연단체 신청 여부 확인
  checkGroupApplication(memberIdx: number | string, year: string | number) {
    return http.read(baseUrl + `/team/check-apply/${year}/${memberIdx}`);
  },

  // 연단체 신청 조회
  groupApplication(memberIdx: number | string, year: string | number) {
    return http.read(baseUrl + `/team/form/${year}/${memberIdx}`);
  },

  // 연단체 신청 등록
  addGroupApplication(list: any) {
    return http.create(baseUrl + '/team/form', list);
  },

  // 연단체 신청 취소
  cancelGroupApplication(idx: number | string) {
    return http.delete(baseUrl + `/team/form/${idx}`);
  },
};
