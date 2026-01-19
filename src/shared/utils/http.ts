import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useUserInfoStore } from '../store/userStore';

const api: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 5000, // 5초 초과 시 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? useUserInfoStore.getState().userInfo.accessToken : null;
    console.log(`token => interceptor`, token);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    // 200번대 응답 처리 - 응답 데이터만 바로 반환하도록 구성 가능
    return response.data;
  },
  async (error: AxiosError) => {
    const { response } = error;

    if (response) {
      // 1. 토큰 만료 등 특정 에러 처리 (예: 401 Unauthorized)
      if (response.status === 401) {
        console.error('인증이 만료되었습니다. 다시 로그인해주세요.');
        // 예: 로그아웃 처리 및 로그인 페이지 리다이렉트
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
      }

      // 2. 서버 에러 메시지 공통 처리
      const errorMessage = (response.data as any)?.message || '서버 오류가 발생했습니다.';
      console.error(`[API Error] ${response.status}: ${errorMessage}`);
    }

    return Promise.reject(error);
  }
);

export default api;