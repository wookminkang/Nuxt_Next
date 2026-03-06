import http from '@/utils/http';

// 클라이언트 컴포넌트에서 사용하는 admin API (토큰은 http 인터셉터에서 자동 처리)
export const adminClientApi = {
  getDashboardPeriods(period: number) {
    return http.read('/hp/api/dashboard/periods', { period });
  },
};
