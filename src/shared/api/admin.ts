import api from '@/shared/utils/http';
import { cookies } from "next/headers";


const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  return token;
}

export const adminApi = {
  getDashboard: async () => {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/hp/api/dashboard?period=0`, {
      headers: {
        'Authorization': `Bearer ${token}`, // 백엔드가 원하는 방식
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    }).then(res => res.json());

    return res;
  },
}