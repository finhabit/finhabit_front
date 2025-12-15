import instance from '@/api/axios';

export interface LevelTestRequest {
  score: number;
}

export interface LevelTestResponse {
  level: string;
}

export interface LevelQuestionDto {
  testId: number;
  testCategory: string;
  testQuestion: string;
  testOption1: string;
  testOption2: string;
  testOption3: string;
  testAnswer: number;
}

export const getLevelTestQuestions = async (): Promise<LevelQuestionDto[]> => {
  const res = await instance.get<LevelQuestionDto[]>('/auth/leveltest');
  return res.data;
};

export const submitLevelTest = async (score: number): Promise<LevelTestResponse> => {
  const res = await instance.post<LevelTestResponse>('/result', { score });
  return res.data;
};
