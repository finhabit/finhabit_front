import instance from '@/api/axios';
import type { TodayFinanceQuizResponse, WeeklyArchiveItem } from '@/types/finance';

export const getTodayFinanceQuiz = async (): Promise<TodayFinanceQuizResponse> => {
  const response = await instance.get<TodayFinanceQuizResponse>('/finance-quiz');
  return response.data;
};

export const getWeeklyArchive = async (): Promise<WeeklyArchiveItem[]> => {
  const response = await instance.get<WeeklyArchiveItem[]>('/finance/week');
  return response.data;
};
