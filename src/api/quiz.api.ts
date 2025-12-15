import instance from '@/api/axios';
import type { TodayQuiz, QuizSubmitResult, TodayQuizExplanation, QuizListResponse } from '@/types/quiz';

export const getTodayQuiz = async (): Promise<TodayQuiz> => {
  const res = await instance.get<TodayQuiz>('/quiz/today');
  return res.data;
};

export const submitQuizAnswer = async (quizId: number, selectedAnswer: number): Promise<QuizSubmitResult> => {
  const res = await instance.post<QuizSubmitResult>('/quiz/check', {
    quizId,
    selectedAnswer,
  });
  return res.data;
};

export const getTodayQuizExplanation = async (): Promise<TodayQuizExplanation> => {
  const res = await instance.get<TodayQuizExplanation>('/quiz/today/answer');
  return res.data;
};

export const getQuizList = async (): Promise<QuizListResponse> => {
  const res = await instance.get<QuizListResponse>('/quiz/list');
  return res.data;
};
