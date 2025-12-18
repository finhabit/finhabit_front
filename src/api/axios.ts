import axios from 'axios';

// src/api/axiosInstance.js (또는 해당 파일)

const instance = axios.create({
  // 개발 환경(DEV)이면 '/api' (Vite 프록시 탐),
  // 배포 환경(PROD)이면 환경변수에 설정된 실제 주소 사용
  baseURL: import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL,

  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
