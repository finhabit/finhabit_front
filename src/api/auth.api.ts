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
  // [수정] 선택 항목이므로 ?(optional) 처리하여 없어도 되게 변경
  levelTestAnswers?: LevelAnswer[];
}

export interface SignupResponse {
  message: string;
  level: string; // 서버 응답에 level이 포함된다면 유지
}

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  // [핵심 수정] levelTestAnswers가 빈 배열([])이면 서버로 보내지 않고 제외합니다.
  // 빈 배열을 보낼 때 400 에러가 나는 경우가 많기 때문입니다.
  const { levelTestAnswers, ...rest } = data;

  const payload = {
    ...rest,
    // 답안이 있을 때만 payload에 포함 (빈 배열이면 제외)
    ...(levelTestAnswers && levelTestAnswers.length > 0 ? { levelTestAnswers } : {}),
  };

  const res = await instance.post<SignupResponse>('/auth/signup', payload);
  return res.data;
};
