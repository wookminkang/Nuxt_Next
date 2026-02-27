import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useUserInfoStore } from '../store/userStore';

// Nuxt의 paramToQuery와 동일한 로직
const paramToQuery = (payload: Record<string, any>): string => {
  return Object.entries(payload)
    .filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string' && value.length === 0) return false;
      if (Array.isArray(value) && value.length === 0) return false;
      return true;
    })
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};

// FormData + 파일 업로드 payload 생성 (Nuxt http.js request() 로직과 동일)
function buildPayload(param?: any, files?: File[] | File | null, formData = false) {
  // 파일 배열인 경우
  if (Array.isArray(files) && files.length > 0) {
    const fd = new FormData();
    if (param) {
      fd.append('data', new Blob([JSON.stringify(param)], { type: 'application/json' }));
    }
    files.forEach((f: any) => {
      if (f.field && !f.name) fd.append(f.field, f.file);
      else fd.append('files', f);
    });
    return { data: fd, options: { headers: { 'Content-Type': 'multipart/form-data' } } };
  }

  // 파일 단일 객체인 경우
  if (files && !Array.isArray(files)) {
    const fd = new FormData();
    fd.append('file', files);
    if (param) {
      fd.append('data', new Blob([JSON.stringify(param)], { type: 'application/json' }));
    }
    return { data: fd, options: { headers: { 'Content-Type': 'multipart/form-data' } } };
  }

  // 파일 없지만 formData=true인 경우
  if (formData) {
    const fd = new FormData();
    if (param) {
      fd.append('data', new Blob([JSON.stringify(param)], { type: 'application/json' }));
    }
    return { data: fd, options: { headers: { 'Content-Type': 'multipart/form-data' } } };
  }

  return { data: param, options: undefined };
}

// 로그인 페이지 여부 확인 (로그인 페이지에서는 리다이렉트 생략)
const isLoginPage = () =>
  typeof window !== 'undefined' && window.location.pathname.includes('/login');

// 인증 만료 처리 (로그인 페이지 제외)
const handleAuthExpired = () => {
  if (typeof window === 'undefined' || isLoginPage()) return;
  localStorage.removeItem('userInfoStore');
  useUserInfoStore.getState().RESET_USER_INFO();
  window.location.href = '/login';
};

// 응답 처리 - Nuxt http.js then() 로직과 동일
function handleResponse(res: any) {
  if (res?.result === true) {
    return res;
  }
  if (res?.result === false) {
    // 인증 만료 코드 처리
    if (res?.fail?.code === '463') {
      handleAuthExpired();
    }
    return Promise.reject(res?.fail);
  }
  // result 필드가 없는 응답(외부 API 등)은 그대로 반환
  return res;
}

// 서버 컴포넌트(SSR)에서는 절대 URL, 클라이언트에서는 상대 URL(rewrites 처리)
const getBaseUrl = () =>
  typeof window === 'undefined' ? (process.env.NEXT_PUBLIC_BASE_URL ?? '') : '';

const api: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== 'undefined' ? useUserInfoStore.getState().userInfo.accessToken : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const { response } = error;
    if (response?.status === 401) {
      handleAuthExpired();
    }
    return Promise.reject(error);
  }
);

// Nuxt의 Http 클래스와 동일한 인터페이스
const http = {
  /** GET 요청 - 쿼리 파라미터 자동 직렬화 */
  read(url: string, param?: Record<string, any>) {
    let fullUrl = url;
    if (param && Object.keys(param).length > 0) {
      const query = paramToQuery(param);
      if (query) fullUrl += (url.includes('?') ? '&' : '?') + query;
    }
    return api.get(fullUrl).then(handleResponse);
  },

  /** POST 요청 (파일 업로드 지원) */
  create(url: string, param?: any, files?: File[] | File | null, formData = false) {
    const { data, options } = buildPayload(param, files, formData);
    return api.post(url, data, options).then(handleResponse);
  },

  /** PUT 요청 (파일 업로드 지원) */
  update(url: string, param?: any, files?: File[] | File | null, formData = false) {
    const { data, options } = buildPayload(param, files, formData);
    return api.put(url, data, options).then(handleResponse);
  },

  /** DELETE 요청 */
  delete(url: string, param?: any) {
    return api.delete(url, param ? { data: param } : undefined).then(handleResponse);
  },

  /** POST 요청 (create 별칭) */
  post(url: string, param?: any, files?: File[] | File | null, formData = false) {
    const { data, options } = buildPayload(param, files, formData);
    return api.post(url, data, options).then(handleResponse);
  },

  /** axios 인스턴스 직접 접근 */
  instance: () => api,
};

export default http;
