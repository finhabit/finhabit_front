import instance from '@/api/axios';

// -------------------- 로그인 관련 --------------------
export interface LoginResponse {
  accessToken: string;
  [key: string]: any;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await instance.post('/auth/login', {
    email,
    password,
  });
  const headerToken = res.headers['authorization'] || res.headers['Authorization'];
  const accessToken = headerToken ? headerToken.replace('Bearer ', '').trim() : '';
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
  }
  return {
    ...res.data,
    accessToken,
  };
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

// -------------------- 마이페이지 관련 --------------------
export interface UserProfile {
  nickname: string;
  email: string;
  level: number;
  maskedPassword?: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await instance.get<UserProfile>('/auth/me/profile');
  return data;
};

export const updateUserProfile = async (data: { nickname?: string; email?: string }) => {
  await instance.patch('/auth/me/profile', data);
};

export interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const updatePassword = async (data: PasswordUpdateRequest) => {
  const res = await instance.patch('/auth/me/password', data);
  return res.data;
};

export const withdrawUser = async () => {
  await instance.delete('/auth/me/withdraw');
};
