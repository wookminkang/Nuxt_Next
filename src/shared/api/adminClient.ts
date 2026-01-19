import api from "@/shared/utils/http";

export const adminClientApi = {
  getDashboardPeriods: async (period: number) => {
    console.log(`period =>`, period);
    const res = await api.get(`/hp/api/dashboard/periods?period=${period}`).then(res => res.data);
    console.log(`res =>`, res);
    return res
  }
}