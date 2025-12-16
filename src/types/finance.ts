export interface TodayFinance {
  financeId: number;
  cardTitle: string;
  cardContent: string;
  cardLevel: number;
  openDate: string;
}

export interface TodayQuiz {
  quizId: number;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  isAnswered: boolean;
}

export interface TodayFinanceQuizResponse {
  todayFinance: TodayFinance;
  todayQuiz: TodayQuiz;
}

export interface WeeklyArchiveItem {
  financeId: number;
  cardTitle: string;
  cardContent: string;
  cardLevel: number;
  openDate: string;
}
