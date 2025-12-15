import instance from '@/api/axios';

// -------------------- 로그인 관련 --------------------
export interface LoginResponse {
  accessToken: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await instance.post('/auth/login', {
    email,
    password,
  });
  return res.data;
};

// -------------------- 회원가입 관련 --------------------
export interface LevelAnswer {
  testId: number;
  userAnswer: number;
}

export interface SignupRequest {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  levelTestAnswers?: LevelAnswer[];
}

export interface SignupResponse {
  message: string;
  level: string;
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const { levelTestAnswers, ...rest } = data;

  const payload = {
    ...rest,
    ...(levelTestAnswers && levelTestAnswers.length > 0 ? { levelTestAnswers } : {}),
  };

  const res = await instance.post<SignupResponse>('/auth/signup', payload);
  return res.data;
};
